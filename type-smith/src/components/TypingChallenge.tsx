import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { WordsmithWorkoutState, Quote } from '../types';


const WordsmithWorkout: React.FC = () => {
    const [state, setState] = useState<WordsmithWorkoutState>({
        quotes: [],
        currentQuote: null,
        inputText: "",
        timer: 60,
        isTestActive: false,
        isTestCompleted: false,
        typedCharacters: 0,
        dialogOpen: false,
        fullTextTyped: "",
    });

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        loadQuotes();
    }, []);

    useEffect(() => {
        handleTimer();
        return () => clearInterval(intervalRef.current!);
    }, [state.isTestActive, state.timer]);

    useEffect(() => {
        startTest();
    }, [state.inputText, state.isTestActive]);


    useEffect(() => {
        transitionToNextQuote();
    }, [state.typedCharacters, state.currentQuote?.text.length]);

    // Load quotes from JSON file
    const loadQuotes = async () => {
        try {
            const response = await fetch('/quotes.json');
            const data = await response.json();
            setState(prevState => ({
                ...prevState,
                quotes: data.quotes,
                currentQuote: getRandomQuote(data.quotes) || null
            }));
        } catch (error) {
            console.error("Failed to load quotes:", error);
        }
    };

    // Handle timer
    const handleTimer = () => {
        if (state.isTestActive && state.timer > 0) {
            intervalRef.current = setInterval(() => {
                setState(prevState => ({ ...prevState, timer: prevState.timer - 1 }));
            }, 1000);
        } else if (state.timer === 0) {
            // Handle when test is over
            setState(prevState => ({
                ...prevState,
                isTestCompleted: true
            }));
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            setState(prevState => ({ ...prevState, dialogOpen: true }));
        }
    };

    // Start the test when user begins typing
    const startTest = () => {
        if (state.inputText.length > 0 && !state.isTestActive) {
            setState(prevState => ({
                ...prevState,
                isTestActive: true,
                timer: 60
            }));
        }
    };

    // Move to the next quote when the current quote is fully typed
    const transitionToNextQuote = () => {
        if (state.typedCharacters >= (state.currentQuote?.text.length || 0)) {
            setState(prevState => ({
                ...prevState,
                inputText: "",
                fullTextTyped: "",
                typedCharacters: 0,
                currentQuote: getRandomQuote(prevState.quotes)
            }));
        }
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setState(prevState => ({
            ...prevState,
            inputText: value,
            fullTextTyped: value,
            typedCharacters: value.length
        }));
    };

    // Reset the test
    const handleTryAgain = () => {
        setState(prevState => ({
            ...prevState,
            isTestActive: false,
            isTestCompleted: false,
            inputText: "",
            timer: 60,
            typedCharacters: 0,
            fullTextTyped: "",
            currentQuote: getRandomQuote(prevState.quotes),
            dialogOpen: false
        }));
    };

    // Get a random quote from the list
    const getRandomQuote = (quotes: Quote[]) => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    };

    // Render the current quote with color effects
    const renderQuote = () => {
        const quoteChars = state.currentQuote?.text.split('') || [];
        const typedChars = state.fullTextTyped.split('');

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
                    {/* Display the current quote */}
                    <blockquote className="text-xl font-semibold text-gray-800 text-center">
                        {state.currentQuote ? renderQuote() : "Loading..."}
                    </blockquote>
                </div>
                <p className="font-mono text-gray-700 mb-4 text-right flex flex-col mt-2">
                    <span>- {state.currentQuote?.author || "Loading..."}</span><span className='italic'>{state.currentQuote?.work || "Loading..."}({state.currentQuote?.year || "Loading..."})</span>

                </p>
                {/* Textarea for user input */}
                <textarea
                    className="w-full p-4 border-2 border-gray-400 rounded-lg text-lg font-mono focus:outline-none focus:border-black resize-none"
                    value={state.inputText}
                    onChange={handleInputChange}
                    rows={3}
                    disabled={state.isTestCompleted}
                    placeholder='Begin typing to start...'
                />
                <div className="mt-1 text-right">
                    {/* Display remaining time */}
                    <p className={`transition-all ${state.isTestActive ? 'font-bold' : ''} ${state.timer <= 10 ? 'text-red-500' : 'text-black'}`}>
                        Time Remaining: {state.timer}s
                    </p>
                </div>
            </div>

            {/* Results Dialog */}
            <Dialog open={state.dialogOpen} onClose={() => handleTryAgain()} className="fixed inset-0 flex items-center justify-center z-50 focus:outline-none bg-black bg-opacity-60">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
                    <DialogPanel className="w-full max-w-md rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out bg-white">
                        <DialogTitle className="text-3xl font-bold font-serif text-gray-800 mb-4 text-center">Test Results</DialogTitle>
                        <div className="text-lg">
                            <p><span className='italic'>Characters Typed:</span> <span className="font-bold">{state.typedCharacters}</span></p>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={handleTryAgain}
                                className="bg-gray-900 text-gray-300 hover:text-white py-2 px-4 rounded-lg w-full hover:bg-black"
                            >
                                Try Again
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
};

export default WordsmithWorkout;
