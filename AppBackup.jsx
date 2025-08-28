/*
* =================================================================================================
* File: src/data/assets.js
* Description: Contains all static asset URLs for images.
* =================================================================================================
*/
export const assets = {
    bgOffice: 'https://placehold.co/1200x800/2d3748/ffffff?text=Makati+Skyrise+Office',
    bgHome: 'https://placehold.co/1200x800/4a5568/ffffff?text=Forbes+Park+Mansion',
    bgResort: 'https://placehold.co/1200x800/38b2ac/ffffff?text=Private+Resort',
    characters: {
        daughter_normal: 'https://placehold.co/400x600/718096/ffffff?text=Daughter',
        government_normal: 'https://placehold.co/400x600/b794f4/ffffff?text=Congressman',
        media_normal: 'https://placehold.co/400x600/f56565/ffffff?text=PR+Specialist',
        employee_normal: 'https://placehold.co/400x600/68d391/ffffff?text=Engineer',
        fixer_normal: 'https://placehold.co/400x600/f6ad55/ffffff?text=The+Fixer',
        assistant: 'https://placehold.co/400x600/a0aec0/ffffff?text=Assistant',
        wife: 'https://placehold.co/400x600/ed64a6/ffffff?text=Wife',
    },
};


/*
* =================================================================================================
* File: src/data/events.js
* Description: Contains all game event data, including main events and random mini-events.
* =================================================================================================
*/
export const randomMiniEvents = [
    { text: "Traffic on EDSA was a nightmare. You were three hours late for a meeting.", effect: null },
    { text: "You discover a new favorite coffee shop in BGC.", effect: null },
    { text: "A distant 'inaanak' asks for tuition money. You ignore the message.", effect: null },
    { text: "Your favorite TV drama was pre-empted by a presidential address.", effect: null },
    { text: "You spend an entire afternoon stuck in a fruitless LTO appointment.", effect: null },
];

export const gameEvents = [
    {
        id: 'event_contract_bid',
        title: "DPWH 'Build, Build, Maybe' Project",
        description: "A lucrative DPWH road project is up for grabs. Congressman 'Gus' Gonzales can ensure you win the bid. He just needs some 'logistical support'.",
        character: 'government_normal',
        background: 'bgOffice',
        choices: [
            {
                text: "Provide 'SOP' for the bid (₱5,000,000).",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, government_friends: prev.government_friends + 15, money: prev.money - 5000000, public_image: prev.public_image - 7, morals: prev.morals - 10 })); return "The funds are transferred to a 'consultancy firm' owned by his nephew. The project is yours."; },
                mini_events: [
                    { text: "Your bid, surprisingly, is the lowest by a few thousand pesos.", effect: { stat: 'government_friends', change: 'up' } },
                    { text: "A rival contractor's permits are suddenly delayed indefinitely.", effect: { stat: 'public_image', change: 'down' } },
                ]
            },
            {
                text: "Remind him of your 'kumpadre' connection.",
                isAvailable: (stats) => stats.government_friends > 65,
                action: (stats, setStats) => { setStats(prev => ({ ...prev, government_friends: prev.government_friends - 5, public_image: prev.public_image - 2, morals: prev.morals - 5 })); return "He sighs. 'Sige na nga, for the sake of our families.' He agrees, but you've used up some goodwill."; },
                mini_events: [
                    { text: "He 'endorses' your company's track record during a committee hearing.", effect: { stat: 'government_friends', change: 'up' } },
                    { text: "You host a lavish dinner for his entire staff.", effect: { stat: 'money', change: 'down' } },
                ]
            },
            {
                text: "Attempt to win the contract fairly.",
                action: (stats, setStats) => {
                    if (Math.random() > 0.9) { setStats(prev => ({ ...prev, money: prev.money + 10000000, public_image: prev.public_image + 10, morals: prev.morals + 15 })); return "By some miracle, your bid was actually the best! You won it clean! (+₱10,000,000)"; }
                    else { setStats(prev => ({ ...prev, public_image: prev.public_image - 5, government_friends: prev.government_friends - 10, morals: prev.morals + 5 })); return "You are disqualified on a technicality. The contract goes to a newly-formed company with no track record."; }
                },
                mini_events: [
                    { text: "A new, obscure requirement is announced a day before the deadline.", effect: { stat: 'government_friends', change: 'down' } },
                ]
            },
        ],
    },
    {
        id: 'event_media_leak',
        title: "Negative 'Vlog' Goes Viral",
        description: "An investigative vlogger posts a video exposing substandard materials in one of your housing projects. Your PR specialist says she can 'manage the narrative'.",
        character: 'media_normal',
        background: 'bgOffice',
        choices: [
            {
                text: "Hire her 'digital marketing' team (₱3,000,000).",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, media_favor: prev.media_favor + 10, money: prev.money - 3000000, public_image: prev.public_image + 5, company_climate: prev.company_climate - 5, morals: prev.morals - 8 })); return "The narrative is managed. The vlogger is accused of being a paid hack by a rival company."; },
                mini_events: [
                    { text: "A network of 'influencers' begins posting about your company's charity work.", effect: { stat: 'media_favor', change: 'up' } },
                    { text: "The original vlog is mass-reported and taken down for 'copyright infringement'.", effect: { stat: 'public_image', change: 'up' } },
                ]
            },
            {
                text: "Release a formal press statement.",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, media_favor: prev.media_favor - 10, public_image: prev.public_image - 15, morals: prev.morals + 5 })); return "Your statement is torn apart by online commenters. Memes about your 'substandard' projects are everywhere."; },
                mini_events: [
                    { text: "The vlogger posts a follow-up video mocking your 'corporate-speak'.", effect: { stat: 'public_image', change: 'down' } },
                ]
            },
        ],
    },
];


/*
* =================================================================================================
* File: src/utils/scoreManager.js
* Description: Utility functions for loading and saving high scores to localStorage.
* =================================================================================================
*/
export const loadHighScores = () => {
    try {
        const savedScores = localStorage.getItem('contractorHighScores');
        return savedScores ? JSON.parse(savedScores) : [];
    } catch (error) {
        console.error("Could not load high scores:", error);
        return [];
    }
};

export const saveHighScore = (scores, newScore) => {
    try {
        const updatedScores = [...scores, newScore]
            .sort((a, b) => b.netWorth - a.netWorth)
            .slice(0, 10); // Keep top 10
        localStorage.setItem('contractorHighScores', JSON.stringify(updatedScores));
        return updatedScores;
    } catch (error) {
        console.error("Could not save high scores:", error);
        return scores; // Return original scores on failure
    }
};


/*
* =================================================================================================
* File: src/utils/gameEndings.js
* Description: Functions to calculate final scores and determine the game ending.
* =================================================================================================
*/
export const calculateScores = (finalStats) => {
    const moneyScore = Math.floor(Math.min(100, finalStats.money / 1500000));
    return {
        morals: Math.max(0, Math.min(100, finalStats.morals)),
        business_acumen: Math.floor(Math.max(0, Math.min(100, (finalStats.company_climate + moneyScore) / 2))),
        public_image: Math.floor(Math.max(0, Math.min(100, (finalStats.public_image + finalStats.media_favor) / 2))),
        family_ties: Math.max(0, Math.min(100, finalStats.daughter_happiness)),
    };
};

export const determineEnding = (finalStats) => {
    if (finalStats.money <= 0) return { title: "Bankrupt!", message: "The checks bounced. The banks seized everything. Your family now flies commercial. The horror." };
    if (finalStats.public_image <= 0) return { title: "Disgraced!", message: "A Senate Blue Ribbon committee hearing made you a national spectacle. You've fled to a country with no extradition treaty." };
    if (finalStats.government_friends > 85 && finalStats.money > 100000000) return { title: "The New Oligarch", message: "You're no longer just a contractor; you're a kingmaker. You own a TV network, a telco, and several congressmen. Your daughter is marrying a senator's son. You've made it." };
    if (finalStats.public_image > 85 && finalStats.money > 50000000) return { title: "The 'Philanthropist'", message: "You've successfully laundered your reputation. Your foundation is the toast of high society, and your name is on a university building. No one remembers how you made your first hundred million." };
    if (finalStats.company_climate <= 10) return { title: "Unionized!", message: "Your employees finally had enough. After a massive strike, they formed a union that now controls your board. You're forced into a 'consultant' role with no real power." };
    return { title: "Survived.", message: `You played the game and survived. You're richer, but not powerful enough to be untouchable. You live comfortably, forever looking over your shoulder. Final Net Worth: ₱${finalStats.money.toLocaleString()}` };
};


/*
* =================================================================================================
* File: src/hooks/useGameLogic.js
* Description: The core game logic, state management, and event handling, all in one custom hook.
* =================================================================================================
*/
import { useState, useEffect, useCallback } from 'react';
// Note: In a real project, these imports would be structured like this:
// import { gameEvents, randomMiniEvents } from '../data/events';
// import { calculateScores, determineEnding } from '../utils/gameEndings';
// import { loadHighScores, saveHighScore as saveScoresUtil } from '../utils/scoreManager';

const initialStats = { public_image: 50, government_friends: 50, company_climate: 50, media_favor: 50, daughter_happiness: 50, money: 50000000, month: 0, morals: 50 };
const TOTAL_MONTHS = 60; // 5 years

export const useGameLogic = () => {
    const [stats, setStats] = useState(initialStats);
    const [names, setNames] = useState({ player: '', wife: '', daughter: '' });
    const [gameState, setGameState] = useState('start');
    const [currentEvent, setCurrentEvent] = useState(null);
    const [eventResult, setEventResult] = useState('');
    const [currentMiniEvents, setCurrentMiniEvents] = useState([]);
    const [ending, setEnding] = useState({ title: '', message: '' });
    const [finalScores, setFinalScores] = useState({});
    const [isAdviserPanelOpen, setAdviserPanelOpen] = useState(false);
    const [highScores, setHighScores] = useState([]);

    useEffect(() => {
        setHighScores(loadHighScores());
    }, []);

    const endGame = useCallback((catastropheEnding) => {
        const finalStats = stats;
        setFinalScores(calculateScores(finalStats));
        setEnding(catastropheEnding || determineEnding(finalStats));
        
        const newScore = { name: names.player, netWorth: finalStats.money, date: new Date().toISOString() };
        const updatedScores = saveHighScore(highScores, newScore);
        setHighScores(updatedScores);

        setGameState('game_over');
    }, [stats, names.player, highScores]);

    const checkForCatastrophe = useCallback(() => {
        const CATASTROPHE_THRESHOLD = 30;
        const check = (stat, probability, ending) => {
            if (stats[stat] < CATASTROPHE_THRESHOLD && Math.random() < probability) {
                endGame(ending);
                return true;
            }
            return false;
        };

        if (check('daughter_happiness', (CATASTROPHE_THRESHOLD - stats.daughter_happiness) / 100, { title: "Family Scandal!", message: "Your daughter's erratic behavior culminates in a viral scandal, ruining your family name." })) return true;
        if (check('company_climate', (CATASTROPHE_THRESHOLD - stats.company_climate) / 100, { title: "Corporate Espionage!", message: "A disgruntled employee sold your secrets to a rival. You're wiped out." })) return true;
        if (check('government_friends', (CATASTROPHE_THRESHOLD - stats.government_friends) / 100, { title: "Political Backstab!", message: "Your 'allies' freeze your assets via an NBI raid. You're finished." })) return true;
        
        return false;
    }, [stats, endGame]);

    const nextMonth = useCallback(() => {
        if (checkForCatastrophe()) return;
        
        const newMonth = stats.month + 1;
        if (newMonth > TOTAL_MONTHS) {
            endGame();
            return;
        }

        setStats(prev => ({ ...prev, month: newMonth }));
        setCurrentEvent(gameEvents[Math.floor(Math.random() * gameEvents.length)]);
        setGameState('playing');
    }, [stats, checkForCatastrophe, endGame]);
    
    const handleChoice = (choice) => {
        const resultText = choice.action(stats, setStats);
        setEventResult(resultText);

        let finalMiniEvents = [...(choice.mini_events || [])];
        let randomPool = [...randomMiniEvents];
        while (finalMiniEvents.length < 4 && randomPool.length > 0) {
            const randomIndex = Math.floor(Math.random() * randomPool.length);
            finalMiniEvents.push(randomPool.splice(randomIndex, 1)[0]);
        }
        setCurrentMiniEvents(finalMiniEvents.slice(0, 4));
        setGameState('weekly_transition');
    };

    const handleStartGame = (chosenNames) => {
        setNames(chosenNames);
        setStats(initialStats);
        nextMonth();
    };
    
    const handleRestart = () => {
        setGameState('start');
    }

    return {
        stats, names, gameState, currentEvent, eventResult, currentMiniEvents,
        ending, finalScores, isAdviserPanelOpen, highScores,
        handleChoice, handleStartGame, nextMonth, handleRestart, setGameState, setAdviserPanelOpen,
    };
};


/*
* =================================================================================================
* File: src/components/StatIcon.jsx
* Description: A small, shared component for rendering SVG icons and the stat progress bar.
* =================================================================================================
*/
import React from 'react';

export const StatIcon = ({ icon, className = "w-6 h-6" }) => {
    const icons = {
        public_image: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
        government_friends: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
        company_climate: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
        media_favor: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />,
        daughter_happiness: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
        advisers: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />,
    };
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">{icons[icon]}</svg>;
};

export const StatBar = ({ label, value, icon }) => {
    const getColor = (val) => {
        if (val > 65) return 'bg-green-500';
        if (val > 35) return 'bg-yellow-500';
        return 'bg-red-500';
    };
    return (
        <div className="w-full bg-gray-700 rounded-full h-6 relative flex items-center">
            <div className={`h-6 rounded-full transition-all duration-500 ${getColor(value)}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
            <div className="absolute inset-0 flex items-center px-2">
                <StatIcon icon={icon} className="w-5 h-5 text-gray-900 mr-1" />
                <span className="text-sm font-bold text-gray-900">{label}</span>
            </div>
        </div>
    );
};


/*
* =================================================================================================
* File: src/components/StatsPanel.jsx
* Description: The main stats panel UI component displayed during gameplay.
* =================================================================================================
*/
// import React from 'react';
// import { StatIcon, StatBar } from './StatIcon';

const StatsPanel = ({ stats, onOpenAdvisers }) => (
    <div className="w-full md:w-1/4 bg-gray-900 p-4 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-center text-white border-b-2 border-gray-700 pb-2">Month: {stats.month}</h2>
        <div className="text-lg font-semibold text-center text-green-400">₱{stats.money.toLocaleString()}</div>
        <StatBar label="Public Image" value={stats.public_image} icon="public_image" />
        <StatBar label="Gov. Friends" value={stats.government_friends} icon="government_friends" />
        <StatBar label="Co. Climate" value={stats.company_climate} icon="company_climate" />
        <StatBar label="Media Favor" value={stats.media_favor} icon="media_favor" />
        <StatBar label="Daughter" value={stats.daughter_happiness} icon="daughter_happiness" />
        <button onClick={onOpenAdvisers} className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center">
            <StatIcon icon="advisers" className="w-6 h-6 mr-2" />
            Advisers
        </button>
    </div>
);

// export default StatsPanel; // In a real project, uncomment this and the imports


/*
* =================================================================================================
* File: src/components/EventScreen.jsx
* Description: The main event screen where the player makes choices.
* =================================================================================================
*/
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


/*
* =================================================================================================
* File: src/components/AdviserPanel.jsx
* Description: The modal panel that shows advice from different characters.
* =================================================================================================
*/
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


/*
* =================================================================================================
* File: src/components/GameScreens.jsx
* Description: A collection of smaller components for different game states (start, naming, etc.).
* =================================================================================================
*/
import { useState, useEffect } from 'react';
// import { assets } from '../data/assets';
// import { StatIcon } from './StatIcon';

export const StartScreen = ({ onStart, onShowHighScores }) => (
    <div className="w-full h-full flex flex-col items-center justify-center text-white text-center p-8" style={{backgroundImage: `url(${assets.bgOffice})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="bg-black bg-opacity-60 p-10 rounded-xl shadow-2xl max-w-2xl">
            <h1 className="text-6xl font-extrabold mb-4">Contractor Tycoon: Manila</h1>
            <p className="text-xl mb-8">Your family name gives you a head start, but in this city, you're either a shark or you're fish food. It's time to build your legacy, one 'negotiated' contract at a time.</p>
            <div className="space-y-4">
                <button onClick={onStart} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-10 rounded-lg text-3xl transition-transform transform hover:scale-105"> New Game </button>
                <button onClick={onShowHighScores} className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-10 rounded-lg text-2xl transition-transform transform hover:scale-105"> High Scores </button>
            </div>
        </div>
    </div>
);

export const NamingScreen = ({ onStartGame }) => {
    const [names, setNames] = useState({ player: '', wife: '', daughter: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (names.player && names.wife && names.daughter) {
            onStartGame(names);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-white p-8 animate-fade-in">
            <div className="bg-gray-800 p-10 rounded-xl shadow-2xl max-w-md w-full">
                <h1 className="text-4xl font-bold mb-6 text-center">Enter Your Legacy</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Your Name" value={names.player} onChange={e => setNames({...names, player: e.target.value})} className="w-full p-3 bg-gray-700 rounded-lg text-white" required />
                    <input type="text" placeholder="Your Wife's Name" value={names.wife} onChange={e => setNames({...names, wife: e.target.value})} className="w-full p-3 bg-gray-700 rounded-lg text-white" required />
                    <input type="text" placeholder="Your Daughter's Name" value={names.daughter} onChange={e => setNames({...names, daughter: e.target.value})} className="w-full p-3 bg-gray-700 rounded-lg text-white" required />
                    <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-xl">Begin</button>
                </form>
            </div>
        </div>
    );
};

export const HighScoreScreen = ({ scores, onBack }) => (
    <div className="w-full h-full flex flex-col items-center justify-center text-white p-8 animate-fade-in">
        <div className="bg-gray-800 p-10 rounded-xl shadow-2xl max-w-2xl w-full">
            <h1 className="text-5xl font-bold mb-6 text-center text-purple-400">Hall of Fame</h1>
            <div className="space-y-2">
                {scores.length > 0 ? scores.map((score, index) => (
                    <div key={index} className="flex justify-between bg-gray-700 p-3 rounded-lg">
                        <span className="font-bold text-lg">{index + 1}. {score.name}</span>
                        <span className="font-semibold text-green-400">₱{score.netWorth.toLocaleString()}</span>
                    </div>
                )) : <p className="text-center text-gray-400">No scores yet. Be the first!</p>}
            </div>
            <button onClick={onBack} className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">Back</button>
        </div>
    </div>
);

export const WeeklyTransitionScreen = ({ miniEvents, onComplete }) => {
    const [week, setWeek] = useState(1);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (week > 4) { onComplete(); return; }
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(() => { setWeek(w => w + 1); setVisible(true); }, 500);
        }, 2000);
        return () => clearTimeout(timer);
    }, [week, onComplete]);

    const currentEvent = miniEvents[week - 1];
    if (!currentEvent) return null;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-white text-center p-8">
            <div className={`bg-gray-800 p-10 rounded-xl shadow-2xl max-w-lg transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-3xl font-bold mb-4">Month in Review: Week {week}</h2>
                <div className="flex items-center justify-center text-lg">
                    {currentEvent.effect && currentEvent.effect.stat && (
                        <div className={`mr-4 p-1 rounded-full ${currentEvent.effect.change === 'up' ? 'bg-green-500' : 'bg-red-500'}`}>
                            <StatIcon icon={currentEvent.effect.stat} className="w-8 h-8 text-white" />
                        </div>
                    )}
                    <p>{currentEvent.text}</p>
                </div>
            </div>
        </div>
    );
};

export const EventResultScreen = ({ result, onNext }) => (
    <div className="w-full h-full flex flex-col items-center justify-center text-white text-center p-8">
        <div className="bg-gray-800 p-10 rounded-xl shadow-2xl max-w-lg animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Outcome</h2>
            <p className="text-lg mb-6">{result}</p>
            <button onClick={onNext} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg text-xl"> End Month </button>
        </div>
    </div>
);

export const LegacyReportScreen = ({ scores, ending, onRestart }) => (
    <div className="w-full h-full flex flex-col items-center justify-center text-white text-center p-8 animate-fade-in">
        <div className="bg-gray-800 p-10 rounded-xl shadow-2xl max-w-2xl">
            <h1 className="text-5xl font-bold text-purple-400 mb-2">Legacy Report</h1>
            <p className="text-lg text-gray-400 mb-6">After 5 years, your story comes to a close.</p>
            <div className="grid grid-cols-2 gap-4 text-left mb-6">
                {Object.entries(scores).map(([key, value]) => (
                    <div key={key} className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-xl font-bold capitalize">{key.replace('_', ' ')}</h3>
                        <p className="text-2xl font-semibold text-green-400">{value} / 100</p>
                    </div>
                ))}
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
                <h2 className="text-3xl font-bold text-red-500 mb-2">{ending.title}</h2>
                <p className="text-lg">{ending.message}</p>
            </div>
            <button onClick={onRestart} className="mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-2xl transition-transform transform hover:scale-110"> Main Menu </button>
        </div>
    </div>
);


/*
* =================================================================================================
* File: src/App.jsx
* Description: The main application component. It imports all other components and the game logic
* hook, and acts as the main controller for rendering the correct UI.
* =================================================================================================
*/
// import React from 'react';

// NOTE: In a real project with a bundler like Vite or Create React App,
// you would have proper imports for CSS and other components like this:
// import './index.css';
// import AdviserPanel from './components/AdviserPanel';
// import EventScreen from './components/EventScreen';
// ... and so on for all other components and hooks.
// For this self-contained example, all components are defined in this single file.

export default function App() {
    const {
        stats, names, gameState, currentEvent, eventResult, currentMiniEvents,
        ending, finalScores, isAdviserPanelOpen, highScores,
        handleChoice, handleStartGame, nextMonth, handleRestart, setGameState, setAdviserPanelOpen,
    } = useGameLogic();

    const renderContent = () => {
        switch (gameState) {
            case 'start':
                return <StartScreen onStart={() => setGameState('naming')} onShowHighScores={() => setGameState('high_scores')} />;
            case 'naming':
                return <NamingScreen onStartGame={handleStartGame} />;
            case 'high_scores':
                return <HighScoreScreen scores={highScores} onBack={() => setGameState('start')} />;
            case 'playing':
                return (
                    <div className="flex flex-col md:flex-row w-full h-full p-4 gap-4">
                        <StatsPanel stats={stats} onOpenAdvisers={() => setAdviserPanelOpen(true)} />
                        {currentEvent && <EventScreen event={currentEvent} onChoice={handleChoice} stats={stats} />}
                    </div>
                );
            case 'weekly_transition':
                return <WeeklyTransitionScreen miniEvents={currentMiniEvents} onComplete={() => setGameState('event_result')} />;
            case 'event_result':
                return <EventResultScreen result={eventResult} onNext={nextMonth} />;
            case 'game_over':
                return <LegacyReportScreen scores={finalScores} ending={ending} onRestart={handleRestart} />;
            default:
                return <div className="text-white">Loading...</div>;
        }
    };

    return (
        <main className="bg-gray-900 text-white font-sans w-full h-screen flex items-center justify-center">
            {/* This style block would typically be in an index.css file */}
            <style>{`
                .animate-fade-in { 
                    animation: fadeIn 0.5s ease-in-out; 
                } 
                @keyframes fadeIn { 
                    from { opacity: 0; transform: translateY(10px); } 
                    to { opacity: 1; transform: translateY(0); } 
                }
            `}</style>
            {isAdviserPanelOpen && <AdviserPanel stats={stats} names={names} onClose={() => setAdviserPanelOpen(false)} />}
            {renderContent()}
        </main>
    );
}
