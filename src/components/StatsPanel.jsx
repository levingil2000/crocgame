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
