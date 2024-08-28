
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-paper p-4 flex flex-col sm:flex-row items-center justify-between mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-black font-typewriter mt-2 sm:mt-4 ml-0 sm:ml-6">
                TypeSmith<span className="blinking-cursor">|</span>
            </h1>
            <span className="text-gray-500 font-bold mt-2 sm:mt-4 mr-0 sm:mr-6">
                <a href="https://github.com/gracielilykelly" className="hover:text-black" target="_blank">@gracielilykelly</a>
            </span>
        </header>
    );
};

export default Header;
