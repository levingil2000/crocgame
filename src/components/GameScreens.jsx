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

