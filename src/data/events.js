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
