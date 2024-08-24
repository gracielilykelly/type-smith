import React from 'react';
import TypewriterEffect from './TypewriterEffect';

const Intro: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-lg mx-auto text-center">
            <div className="font-serif text-gray-800 min-h-24 mb-0"><TypewriterEffect text="Craft Your Tales with Speed & Precision" /></div>
            <p className="text-lg text-gray-700 mt-2">
                Enhance your writing by mastering typing speed and accuracy while being inspired by quotes from literary greats.
            </p>
        </div>
    );
};

export default Intro;
