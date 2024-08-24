import React from 'react';

interface ResultsProps {
    accuracy: number | null;
    grossWpm: number | null;
    netWpm: number | null;
}

const Results: React.FC<ResultsProps> = ({ accuracy, grossWpm, netWpm }) => {
    return (
        <div className="mt-4 bg-white p-4 rounded shadow-lg">
            <h2 className="text-2xl font-bold text-center">Results</h2>
            <p className="text-lg">Accuracy: {accuracy?.toFixed(2)}%</p>
            <p className="text-lg">Gross WPM: {grossWpm?.toFixed(2)}</p>
            <p className="text-lg">Net WPM: {netWpm?.toFixed(2)}</p>
        </div>
    );
};

export default Results;
