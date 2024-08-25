
export interface Quote {
    text: string;
    author: string;
    work: string;
    year: number;
}

export interface WordsmithWorkoutState {
    quotes: Quote[];
    currentQuote: Quote | null;
    inputText: string;
    timer: number;
    errors: number;
    isTestActive: boolean;
    isTestCompleted: boolean;
    typedCharacters: number;
    dialogOpen: boolean;
    fullTextTyped: string;
    correctCharacters: number;
    totalTypedCharacters: number;
    totalCorrectCharacters: number;
    totalErrors: number;
}