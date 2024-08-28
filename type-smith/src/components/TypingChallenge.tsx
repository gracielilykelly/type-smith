import React, { useState, useEffect, useRef } from 'react';
import ResultsDialog from './ResultsDialog';
import { calculateWPM, calculateAccuracy } from '../utils/calculations';
import { TypingChallengeState, Quote } from '../types';

const initialState: TypingChallengeState = {
    quotes: [],
    currentQuote: null,
    inputText: "",
    timer: 60,
    isTestActive: false,
    isTestCompleted: false,
    typedCharacters: 0,
    correctCharacters: 0,
    totalTypedCharacters: 0,
    totalCorrectCharacters: 0,
    totalErrors: 0,
    errors: 0,
    dialogOpen: false,
    fullTextTyped: "",
};

const TypingChallenge: React.FC = () => {
    const [state, setState] = useState<TypingChallengeState>(initialState);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        loadQuotes();
    }, []);

    useEffect(() => {
        if (state.isTestActive) {
            handleTimer();
        }
        return () => clearInterval(intervalRef.current!);
    }, [state.isTestActive, state.timer]);

    useEffect(() => {
        if (state.inputText.length > 0 && !state.isTestActive) {
            startTest();
        }
    }, [state.inputText]);

    useEffect(() => {
        if (state.typedCharacters >= (state.currentQuote?.text.length || 0)) {
            transitionToNextQuote();
        }
    }, [state.typedCharacters]);

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

    const handleTimer = () => {
        if (state.isTestActive && state.timer > 0) {
            intervalRef.current = setInterval(() => {
                setState(prevState => ({ ...prevState, timer: prevState.timer - 1 }));
            }, 1000);
        } else if (state.timer === 0) {
            setState(prevState => ({
                ...prevState,
                isTestCompleted: true,
                dialogOpen: true,
            }));
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
        }
    };

    const startTest = () => {
        if (!state.isTestActive) {
            setState(prevState => ({
                ...prevState,
                isTestActive: true,
                timer: 60
            }));
        }
    };

    const transitionToNextQuote = () => {
        if (state.typedCharacters >= (state.currentQuote?.text.length || 0)) {
            setState(prevState => ({
                ...prevState,
                inputText: "",
                fullTextTyped: "",
                currentQuote: getRandomQuote(prevState.quotes),
                totalTypedCharacters: prevState.totalTypedCharacters + state.typedCharacters,
                totalCorrectCharacters: prevState.totalCorrectCharacters + state.correctCharacters,
                totalErrors: prevState.totalErrors + state.errors,
                typedCharacters: 0,
                correctCharacters: 0,
                errors: 0,
            }));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const correctCharacters = calculateCorrectCharacters(value, state.currentQuote?.text || "");
        const errors = Math.max(0, value.length - correctCharacters); // Ensure errors are non-negative

        setState(prevState => ({
            ...prevState,
            inputText: value,
            fullTextTyped: value,
            typedCharacters: value.length,
            correctCharacters: correctCharacters,
            errors: errors,
        }));
    };

    const calculateCorrectCharacters = (typedText: string, originalText: string): number => {
        let correctCount = 0;
        const length = Math.min(typedText.length, originalText.length);

        for (let i = 0; i < length; i++) {
            if (typedText[i] === originalText[i]) {
                correctCount++;
            }
        }

        return correctCount;
    };

    const handleTryAgain = () => {
        setState(prevState => ({
            ...prevState,
            isTestActive: false,
            isTestCompleted: false,
            inputText: "",
            timer: 60,
            typedCharacters: 0,
            correctCharacters: 0,
            totalTypedCharacters: prevState.totalTypedCharacters + state.typedCharacters,
            totalCorrectCharacters: prevState.totalCorrectCharacters + state.correctCharacters,
            totalErrors: prevState.totalErrors + state.errors,
            errors: 0,
            fullTextTyped: "",
            currentQuote: getRandomQuote(prevState.quotes),
            dialogOpen: false
        }));
    };

    const getRandomQuote = (quotes: Quote[]) => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    };

    // Calculate results
    const wpm = calculateWPM(state.totalTypedCharacters, 60 - state.timer);
    const accuracy = state.totalTypedCharacters === 0 ? 0 : calculateAccuracy(state.totalCorrectCharacters, state.totalTypedCharacters); // Round to 2 decimal places

    // Render quote with highlighting
    const renderQuote = () => {
        const quoteChars = state.currentQuote?.text.split('') || [];
        const typedChars = state.inputText.split('');

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
        <div className="max-w-xl mx-auto p-4 w-full bg-white rounded-lg shadow-lg mb-2 text-left">
            <div className="p-8 max-w-lg w-full">
                <div className="font-mono text-lg text-black mb-2 mt-2">
                    <blockquote className="text-xl font-semibold text-gray-800 text-left">
                        {state.currentQuote ? renderQuote() : "Loading..."}
                    </blockquote>
                </div>
                <p className="font-mono text-gray-700 mb-4 text-right flex flex-col mt-2">
                    <span>- {state.currentQuote?.author || "Loading..."}</span>
                    <span className='italic'>{state.currentQuote?.work || "Loading..."} ({state.currentQuote?.year || "Loading..."})</span>
                </p>
                <textarea
                    className="w-full p-4 border-2 border-gray-400 rounded-lg text-lg font-mono focus:outline-none focus:border-black resize-none"
                    value={state.inputText}
                    onChange={handleInputChange}
                    rows={3}
                    disabled={state.isTestCompleted}
                    placeholder='Begin typing to start...'
                />
                <div className="mt-1 text-right">
                    <p className={`transition-all ${state.isTestActive ? 'font-bold' : ''} ${state.timer <= 10 ? 'text-red-500' : 'text-black'}`}>
                        Time Remaining: {state.timer}s
                    </p>
                </div>
            </div>

            <ResultsDialog
                isOpen={state.dialogOpen}
                onClose={handleTryAgain}
                wpm={wpm}
                accuracy={accuracy}
                handleTryAgain={handleTryAgain}
            />
        </div>
    );
};

export default TypingChallenge;
