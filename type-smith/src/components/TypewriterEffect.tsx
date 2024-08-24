import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
    text: string;
    speed?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text, speed = 120 }) => {
    const [displayedText, setDisplayedText] = useState<string>('');
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayedText((prev) => prev + text[index]);
            setIndex((prevIndex) => prevIndex + 1);
        }, speed);

        if (index === text.length) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [index, text, speed]);

    return (
        <h1 className="text-4xl font-bold text-center font-typewriter">
            {displayedText}
            <span className="blinking-cursor">|</span>
        </h1>
    );
};

export default TypewriterEffect;
