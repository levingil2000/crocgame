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
