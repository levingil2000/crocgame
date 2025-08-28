import React from 'react';

/*
* NOTE: In a real project with a bundler like Vite or Create React App,
* you would have proper imports for CSS and other components like this:
*
* import './index.css';
* import AdviserPanel from './components/AdviserPanel';
* import EventScreen from './components/EventScreen';
* import StatsPanel from './components/StatsPanel';
* import { 
* StartScreen, 
* NamingScreen, 
* HighScoreScreen, 
* WeeklyTransitionScreen, 
* EventResultScreen, 
* LegacyReportScreen 
* } from './components/GameScreens';
* import { useGameLogic } from './hooks/useGameLogic';
*
* For the self-contained example in the document, all the component
* definitions are included in one file, but this is how you would
* structure the final, clean App.jsx.
*/

// For the sake of a runnable example, let's assume the other files exist
// and their exports are available. The code below is the "ideal" clean version.

import { useGameLogic } from './hooks/useGameLogic';
import AdviserPanel from './components/AdviserPanel';
import EventScreen from './components/EventScreen';
import StatsPanel from './components/StatsPanel';
import { 
    StartScreen, 
    NamingScreen, 
    HighScoreScreen, 
    WeeklyTransitionScreen, 
    EventResultScreen, 
    LegacyReportScreen 
} from './components/GameScreens';


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