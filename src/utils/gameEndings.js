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

