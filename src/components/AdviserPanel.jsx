// import React from 'react';
// import { assets } from '../data/assets';

const AdviserPanel = ({ stats, names, onClose }) => {
    const getAdvice = (stat, high, mid, low) => {
        if (stats[stat] > 70) return high;
        if (stats[stat] < 35) return low;
        return mid;
    };

    const advisers = [
        { name: "PR Man", character: "media_normal", advice: getAdvice('public_image', "Boss, the public loves us! We're practically saints.", "We're flying under the radar, boss. Let's keep it that way.", "It's a PR disaster out there! They're calling us 'buwaya' on primetime news!") },
        { name: "Assistant", character: "assistant", advice: getAdvice('company_climate', "The employees are motivated and productive. Our operations are smooth.", "Things are stable, but let's watch out for any internal issues.", "Morale is dangerously low. I'm hearing whispers of a union forming. We need to act.") },
        { name: "Congressman", character: "government_normal", advice: getAdvice('government_friends', "My friend, your name is golden in the halls of power. Any project you want is yours.", "Your connections are solid, but don't take them for granted. Remember your friends.", "You're on thin ice. My colleagues are starting to see you as a liability, not an asset.") },
        { name: names.wife, character: "wife", advice: getAdvice('daughter_happiness', `${names.daughter} is so happy. Thank you for being a wonderful father.`, "She's a teenager, what can you do? Just... try to be there for her.", `She barely speaks to us anymore. She's miserable, and frankly, I'm worried about ${names.daughter}.`) },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-4xl">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Adviser Briefing</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {advisers.map(adviser => (
                        <div key={adviser.name} className="flex items-start space-x-4 bg-gray-700 p-4 rounded-lg">
                            <img src={assets.characters[adviser.character]} alt={adviser.name} className="w-24 h-32 object-cover rounded" />
                            <div>
                                <h3 className="text-xl font-bold text-purple-400">{adviser.name}</h3>
                                <p className="text-gray-300 italic">"{adviser.advice}"</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={onClose} className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">Close</button>
            </div>
        </div>
    );
};

// export default AdviserPanel; // In a real project, uncomment this and the imports
