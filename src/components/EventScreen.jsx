// import React from 'react';
// import { assets } from '../data/assets';

const EventScreen = ({ event, onChoice, stats }) => (
    <div className="w-full md:w-3/4 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-2xl overflow-hidden animate-fade-in">
            <div className="relative">
                <img src={assets[event.background]} alt="background" className="w-full h-64 object-cover" />
                <img src={assets.characters[event.character]} alt="character" className="absolute bottom-0 right-10 h-80 object-contain" />
            </div>
            <div className="p-6">
                <h2 className="text-3xl font-bold text-white mb-4">{event.title}</h2>
                <p className="text-gray-300 mb-6">{event.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.choices.map((choice, index) => {
                        const isAvailable = choice.isAvailable ? choice.isAvailable(stats) : true;
                        return (
                            <button key={index} onClick={() => onChoice(choice)} disabled={!isAvailable}
                                className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${isAvailable ? 'bg-purple-600 hover:bg-purple-700 text-white transform hover:scale-105' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}>
                                <p className="font-semibold">{choice.text}</p>
                                {!isAvailable && <p className="text-xs text-red-300">Requires certain stats</p>}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
);

// export default EventScreen; // In a real project, uncomment this and the imports

