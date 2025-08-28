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
