import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';

const quotes = [
    { text: "To be, or not to be, that is the question.", author: "William Shakespeare" },
    { text: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt" },
    { text: "I think, therefore I am.", author: "René Descartes" },
    { text: "The unexamined life is not worth living.", author: "Socrates" },
    { text: "That's one small step for man, one giant leap for mankind.", author: "Neil Armstrong" },
];

const TypingTest: React.FC = () => {
    const [currentQuote, setCurrentQuote] = useState(quotes[0]);
    const [inputText, setInputText] = useState("");
    const [timer, setTimer] = useState(60);
    const [isTestActive, setIsTestActive] = useState(false);
    const [isTestCompleted, setIsTestCompleted] = useState(false);
    const [typedWords, setTypedWords] = useState<number>(0);
    const [typedCharacters, setTypedCharacters] = useState<number>(0);
    const [correctWords, setCorrectWords] = useState<number>(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [fullTextTyped, setFullTextTyped] = useState<string>("");

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isTestActive && timer > 0) {
            intervalRef.current = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsTestCompleted(true);
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            setDialogOpen(true);
        }

        return () => clearInterval(intervalRef.current!);
    }, [isTestActive, timer]);

    useEffect(() => {
        if (inputText.length > 0 && !isTestActive) {
            setIsTestActive(true);
            setTimer(60);
        }
    }, [inputText, isTestActive]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputText(value);
        setFullTextTyped(value);
        setTypedCharacters(value.length);

        if (value === currentQuote.text) {
            setTypedWords(prev => prev + countWords(value));
            setCorrectWords(prev => prev + countWords(value));
            setFullTextTyped("");
            setInputText("");
            setCurrentQuote(getRandomQuote());
        }
    };

    const handleTryAgain = () => {
        setIsTestActive(false);
        setIsTestCompleted(false);
        setInputText("");
        setTimer(60);
        setTypedWords(0);
        setCorrectWords(0);
        setTypedCharacters(0);
        setFullTextTyped("");
        setCurrentQuote(getRandomQuote());
        setDialogOpen(false);
    };

    const countWords = (text: string) => {
        return text.trim().split(/\s+/).length;
    };

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    };

    // Calculate Gross WPM based on characters typed
    const calculateGrossWPMFromCharacters = () => {
        const elapsedMinutes = 1;
        const cpm = typedCharacters / elapsedMinutes;
        const wpm = cpm / 5; // Convert characters per minute to words per minute
        return parseFloat(wpm.toFixed(2));
    };


    // Calculate Gross WPM based on words typed
    const calculateGrossWPMFromWords = () => {
        const elapsedMinutes = 1;
        const wpm = typedWords / elapsedMinutes;
        return parseFloat(wpm.toFixed(2));
    };

    // Calculate Accuracy
    const calculateAccuracy = () => {
        const fullText = currentQuote.text;
        const totalCharacters = fullText.length;
        const correctCharacters = fullText.split('').reduce((acc, char, index) => {
            return acc + (fullTextTyped[index] === char ? 1 : 0);
        }, 0);

        const accuracy = totalCharacters === 0 ? 100 : (correctCharacters / totalCharacters) * 100;
        return parseFloat(accuracy.toFixed(2));
    };

    // Calculate Net WPM
    const calculateNetWPM = () => {
        const grossWPM = calculateGrossWPMFromCharacters();
        const accuracy = calculateAccuracy();
        const netWPM = grossWPM * (accuracy / 100);
        return parseFloat(netWPM.toFixed(2));
    };


    return (
        <div className="flex justify-center items-center bg-paper p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
                <h1 className="text-4xl font-serif text-gray-800 mb-2">
                    The Wordsmith's Workout
                    <span className="absolute top-0 right-0 animate-blink text-black border-r-4 border-black"></span>
                </h1>
                <p>Begin typing to start the challenge.</p>
                <p className="font-mono text-lg text-black mb-4">
                    <span className="whitespace-pre-wrap">
                        {currentQuote.text.split('').map((char, index) => {
                            let color = '';
                            let underline = '';

                            if (index < fullTextTyped.length) {
                                if (fullTextTyped[index] === char) {
                                    if (char === ' ') {
                                        underline = ''; // Green underline for correct spaces
                                    } else {
                                        color = 'text-green-500'; // Green for correct characters
                                    }
                                } else {
                                    if (char === ' ') {
                                        underline = 'border-b-2 border-red-500'; // Red underline for incorrect spaces
                                    } else {
                                        color = 'text-red-500'; // Red for incorrect characters
                                    }
                                }
                            } else {
                                if (char === ' ') {
                                    underline = ''; // Gray underline for untyped spaces
                                } else {
                                    color = 'text-gray-500'; // Gray for untyped characters
                                }
                            }

                            return (
                                <span
                                    key={index}
                                    className={`inline-block ${color} ${underline}`}
                                    style={{ textDecoration: underline }}
                                >
                                    {char}
                                </span>
                            );
                        })}
                    </span>
                </p>
                <p className="font-mono text-lg text-gray-700 mb-6">
                    — {currentQuote.author}
                </p>
                <textarea
                    className="w-full p-4 border-2 border-gray-400 rounded-lg text-lg font-mono focus:outline-none focus:border-black"
                    value={inputText}
                    onChange={handleInputChange}
                    rows={4}
                    disabled={isTestCompleted}
                />
                <div className="mt-4 text-lg">
                    <p className={`transition-all ${timer <= 10 ? 'text-red-500 font-bold' : 'text-black'}`}>
                        Time Remaining: {timer}s
                    </p>
                    {isTestCompleted && (
                        <div className="mt-4">
                            <p>Words Typed: {typedWords}</p>
                            <p>Gross WPM (from characters): {calculateGrossWPMFromCharacters()}</p>
                            <p>Gross WPM (from words): {calculateGrossWPMFromWords()}</p>
                            <p>Accuracy: {calculateAccuracy()}%</p>
                            <p>Net WPM: {calculateNetWPM()}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Results Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="fixed inset-0 flex items-center justify-center z-50">
                <Dialog.Panel className="bg-white p-6 rounded shadow-lg">
                    <Dialog.Title className="text-2xl font-bold mb-4">Test Results</Dialog.Title>
                    <div className="text-lg">
                        <p>Words Typed: {typedWords}</p>
                        <p>Gross WPM (from characters): {calculateGrossWPMFromCharacters()}</p>
                        <p>Gross WPM (from words): {calculateGrossWPMFromWords()}</p>
                        <p>Accuracy: {calculateAccuracy()}%</p>
                        <p>Net WPM: {calculateNetWPM()}</p>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleTryAgain}
                            className="bg-gray-800 text-white py-2 px-4 rounded-lg"
                        >
                            Try Again
                        </button>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
};

export default TypingTest;
