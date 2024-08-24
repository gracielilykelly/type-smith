import React from 'react';
import TypewriterEffect from './TypewriterEffect';

const Intro: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-lg mx-auto text-center">
            <p className="text-2xl font-serif text-gray-800 mb-2"><TypewriterEffect text="Craft Your Tales with Precision"/></p>
            <p className="text-lg text-gray-700">
                Enhance your writing by mastering typing speed and accuracy while being inspired by quotes from literary greats.
            </p>
        </div>
    );
};

export default Intro;
