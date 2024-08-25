import React from 'react';
import { Dialog } from '@headlessui/react';

interface TestResultsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    wpm: number;
    accuracy: string | number;
    handleTryAgain: () => void;
}

const TestResultsDialog: React.FC<TestResultsDialogProps> = ({
    isOpen,
    onClose,
    wpm,
    accuracy,
    handleTryAgain,
}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 flex items-center justify-center z-50 focus:outline-none bg-black bg-opacity-60"
        >
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out bg-white">
                    <Dialog.Title className="text-3xl font-bold font-serif text-gray-800 mb-4 text-center">
                        Test Results
                    </Dialog.Title>
                    <div className="text-lg text-center">
                        <p>
                            <span className="italic">WPM:</span>{' '}
                            <span className="font-bold">{wpm}</span>
                        </p>
                        <p>
                            <span className="italic">Accuracy:</span>{' '}
                            <span className="font-bold">{accuracy}%</span>
                        </p>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleTryAgain}
                            className="bg-gray-900 text-gray-300 hover:text-white py-2 px-4 rounded-lg w-full hover:bg-black"
                        >
                            Try Again
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default TestResultsDialog;
