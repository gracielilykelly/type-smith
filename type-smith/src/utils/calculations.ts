
const _averageWords = (totalTypedCharacters: number): number => {
  return totalTypedCharacters / 5;
}

const _timeInMinutes = (elapsedTimeInSeconds: number): number => {
  return elapsedTimeInSeconds / 60;
}

// Calculate Gross WPM
export const calculateWPM = (totalTypedCharacters: number, elapsedTimeInSeconds: number): number => {
    return _averageWords(totalTypedCharacters) / _timeInMinutes(elapsedTimeInSeconds);
};

// Calculate Accuracy
export const calculateAccuracy = (correctCharacters: number, totalTypedCharacters: number): string => {
    return ((correctCharacters / totalTypedCharacters) * 100).toFixed(2);
};
