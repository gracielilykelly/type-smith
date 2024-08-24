
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-paper p-1 flex items-center justify-between">
            <h1 className="text-4xl font-bold text-black font-typewriter mt-4 ml-6">
                TypeSmith<span className="blinking-cursor">|</span>
            </h1>
            <span className="text-gray-500 font-bold mr-6">
                <a href="https://github.com/gracielilykelly" className="hover:text-black" target="_blank">@gracielilykelly</a>
            </span>
        </header>
    );
};

export default Header;
