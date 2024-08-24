
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
    isTestActive: boolean;
    isTestCompleted: boolean;
    typedCharacters: number;
    dialogOpen: boolean;
    fullTextTyped: string;
}