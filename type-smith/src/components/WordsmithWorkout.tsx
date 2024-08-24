import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';

const quotes = [
    { text: "To be, or not to be, that is the question.", author: "William Shakespeare" },
    { text: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt" },
    { text: "I think, therefore I am.", author: "René Descartes" },
    { text: "The unexamined life is not worth living.", author: "Socrates" },
    { text: "That's one small step for man, one giant leap for mankind.", author: "Neil Armstrong" },
];

const WordsmithWorkout: React.FC = () => {
    const [currentQuote, setCurrentQuote] = useState(quotes[0]);
    const [inputText, setInputText] = useState("");
    const [timer, setTimer] = useState(60);
    const [isTestActive, setIsTestActive] = useState(false);
    const [isTestCompleted, setIsTestCompleted] = useState(false);
    const [typedCharacters, setTypedCharacters] = useState<number>(0);
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

    useEffect(() => {
        if (typedCharacters >= currentQuote.text.length) {
            // Move to next quote
            setInputText("");
            setFullTextTyped("");
            setTypedCharacters(0);
            setCurrentQuote(getRandomQuote());
        }
    }, [typedCharacters]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputText(value);
        setFullTextTyped(value);
        setTypedCharacters(value.length);
    };

    const handleTryAgain = () => {
        setIsTestActive(false);
        setIsTestCompleted(false);
        setInputText("");
        setTimer(60);
        setTypedCharacters(0);
        setFullTextTyped("");
        setCurrentQuote(getRandomQuote());
        setDialogOpen(false);
    };

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    };

    const renderQuote = () => {
        const quoteChars = currentQuote.text.split('');
        const typedChars = fullTextTyped.split('');

        return quoteChars.map((char, index) => {
            let color = 'text-gray-700';
            let underline = '';

            if (index < typedChars.length) {
                if (typedChars[index] === char) {
                    color = char === ' ' ? 'text-gray-500' : 'text-green-500';
                } else {
                    color = char === ' ' ? 'text-red-500' : 'text-red-500';
                    underline = char === ' ' ? 'border-b-2 border-red-500' : '';
                }
            }

            return (
                <span
                    key={index}
                    className={`inline ${color} ${underline}`}
                    style={char === ' ' && underline ? { textDecoration: 'underline', textDecorationColor: 'red' } : {}}
                >
                    {char}
                </span>
            );
        });
    };

    return (
        <div className="flex justify-center items-center bg-paper p-4 w-full">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
                <div className="font-mono text-lg text-black mb-2 mt-2">
                    {/* Quote to Type */}
                    <blockquote className="text-xl font-semibold text-gray-800 text-center">
                        {renderQuote()}
                    </blockquote>
                </div>
                <p className="font-mono text-gray-700 mb-4 text-right">
                    — {currentQuote.author}
                </p>
                {/* Test Textarea */}
                <textarea
                    className="w-full p-4 border-2 border-gray-400 rounded-lg text-lg font-mono focus:outline-none focus:border-black"
                    value={inputText}
                    onChange={handleInputChange}
                    rows={3}
                    disabled={isTestCompleted}
                    placeholder='Begin typing to start the challenge...'
                />
                <div className="mt-1 text-right">
                    <p className={`transition-all ${isTestActive ? 'font-bold' : ''} ${timer <= 10 ? 'text-red-500' : 'text-black'}`}>
                        Time Remaining: {timer}s
                    </p>
                </div>
            </div>

            {/* Results Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="fixed inset-0 flex items-center justify-center z-50">
                <Dialog.Panel className="bg-white p-6 rounded shadow-lg">
                    <Dialog.Title className="text-2xl font-bold mb-4">Test Results</Dialog.Title>
                    <div className="text-lg">
                        <p>Characters Typed: {typedCharacters}</p>
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

export default WordsmithWorkout;
