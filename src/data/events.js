export const randomMiniEvents = [
    { text: "Traffic on EDSA was a nightmare. You were three hours late for a meeting.", effect: null },
    { text: "You discover a new favorite coffee shop in BGC.", effect: null },
    { text: "A distant 'inaanak' asks for tuition money. You ignore the message.", effect: null },
    { text: "Your favorite TV drama was pre-empted by a presidential address.", effect: null },
    { text: "You spend an entire afternoon stuck in a fruitless LTO appointment.", effect: null },
    // New Mini Events Added Below
    { text: "You get pulled over for number coding. A crisp ₱500 bill makes the traffic enforcer forget he saw you.", effect: null },
    { text: "The barangay captain 'requests' a donation for the local basketball league's new uniforms.", effect: null },
    { text: "Your application for membership at the Manila Polo Club was approved. Time for some networking.", effect: null },
    { text: "A typhoon is upgraded to Signal No. 4. All work is suspended, delaying your projects.", effect: null },
    { text: "You read a news article about a rival developer facing corruption charges. You quietly thank your connections.", effect: null },
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
    {
        id: 'event_bir_audit',
        title: "A 'Friendly' Visit from the BIR",
        description: "An auditor from the BIR has found some 'discrepancies' in your books. He suggests he can make them go away for a 'facilitation fee'.",
        character: 'government_normal',
        background: 'bgOffice',
        choices: [
            {
                text: "Pay the 'facilitator' to fix the 'discrepancies' (₱4,000,000).",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 4000000, morals: prev.morals - 10, government_friends: prev.government_friends + 5 })); return "The auditor thanks you for your 'cooperation'. The discrepancies vanish from the record."; },
                mini_events: [
                    { text: "Your accountant 'finds' a box of misplaced receipts that clears everything up.", effect: { stat: 'money', change: 'down' } },
                ]
            },
            {
                text: "Fight it. Our books are clean!",
                action: (stats, setStats) => {
                    if (stats.morals > 70) { setStats(prev => ({ ...prev, morals: prev.morals + 10, public_image: prev.public_image + 5 })); return "After a lengthy review, they find nothing wrong. Your reputation for integrity grows."; }
                    else { setStats(prev => ({ ...prev, money: prev.money - 15000000, public_image: prev.public_image - 15, government_friends: prev.government_friends - 10 })); return "They slap you with massive penalties for 'errors'. It seems you weren't as clean as you thought."; }
                },
                mini_events: [
                    { text: "An anonymous 'tip' leads auditors to scrutinize your accounts even more closely.", effect: { stat: 'public_image', change: 'down' } },
                ]
            }
        ]
    },
    {
        id: 'event_worker_safety',
        title: 'Construction Site Accident',
        description: "A scaffolding collapsed at your site, injuring a worker. He wasn't wearing company-issued safety gear. His family is demanding compensation.",
        character: 'worker_normal',
        background: 'bgConstruction',
        choices: [
            {
                text: "Pay for all medical bills and give generous 'ayuda' (₱1,500,000).",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 1500000, morals: prev.morals + 10, company_climate: prev.company_climate + 15, public_image: prev.public_image + 5 })); return "The family is grateful, and your employees' loyalty soars. You are seen as a compassionate employer."; },
                mini_events: [
                    { text: "A local news outlet runs a positive story about your company's generosity.", effect: { stat: 'public_image', change: 'up' } },
                ]
            },
            {
                text: "Offer the standard, legally-required minimum compensation.",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 250000, morals: prev.morals - 5, company_climate: prev.company_climate - 10, public_image: prev.public_image - 5 })); return "You've met your legal obligations, but the workers are grumbling about your lack of 'malasakit'."; },
            },
            {
                text: "Blame the worker's negligence. Have your lawyers handle it.",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, morals: prev.morals - 15, company_climate: prev.company_climate - 20, public_image: prev.public_image - 10 })); return "Your lawyers win, but the victory is hollow. Your company is branded as ruthless and anti-labor."; },
                mini_events: [
                    { text: "A labor rights group stages a protest outside your main office.", effect: { stat: 'public_image', change: 'down' } },
                    { text: "Employee resignations have noticeably increased this month.", effect: { stat: 'company_climate', change: 'down' } },
                ]
            }
        ]
    },
    {
        id: 'event_daughter_debut',
        title: "Daughter's Grand Debut",
        description: "Your only daughter is turning 18. This is a massive social event, and the 'titas of Manila' are watching. The pressure is on.",
        character: 'family_normal',
        background: 'bgMansion',
        choices: [
            {
                text: "Spare no expense. The talk of the town! (₱10,000,000)",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 10000000, public_image: prev.public_image + 15, family_relations: prev.family_relations + 10 })); return "The debut was legendary! A showbiz celebrity even performed. Your family is ecstatic and your social standing has never been higher."; },
                mini_events: [
                    { text: "A famous society columnist features your daughter's party in her column.", effect: { stat: 'public_image', change: 'up' } },
                ]
            },
            {
                text: "A tasteful, 'budgeted' affair (₱2,000,000).",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 2000000, public_image: prev.public_image + 5, family_relations: prev.family_relations + 5 })); return "It was a beautiful and elegant party. Your family is happy, and you showed sensible restraint."; },
            },
            {
                text: "It's just a birthday. A simple family dinner will do.",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, morals: prev.morals + 5, public_image: prev.public_image - 10, family_relations: prev.family_relations - 15 })); return "You saved money, but your wife and daughter are giving you the silent treatment. The society circles are whispering about your 'stinginess'."; },
                mini_events: [
                    { text: "Your wife 'jokes' about how her friend's daughter had a much grander debut.", effect: { stat: 'family_relations', change: 'down' } },
                ]
            }
        ]
    },
    {
        id: 'event_fiesta_sponsorship',
        title: 'Hometown Fiesta King',
        description: "The mayor of your provincial hometown is asking for a 'major sponsorship' for the upcoming town fiesta. It's a great PR opportunity back home.",
        character: 'government_normal',
        background: 'bgProvince',
        choices: [
            {
                text: "Be the 'Hermano Mayor'. Sponsor the whole shebang! (₱3,000,000)",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 3000000, public_image: prev.public_image + 10, government_friends: prev.government_friends + 7 })); return "They named the main stage after you! You're a hero in your hometown, and the mayor owes you one."; },
                mini_events: [
                    { text: "A 'Tarpaulin' with your face on it is hanging in the town plaza.", effect: { stat: 'public_image', change: 'up' } },
                ]
            },
            {
                text: "Make a modest, but public, donation (₱500,000).",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 500000, public_image: prev.public_image + 3, government_friends: prev.government_friends + 2 })); return "Your family name was mentioned during the opening remarks. A respectable contribution."; },
            },
            {
                text: "Politely decline. 'Business is tough right now.'",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, public_image: prev.public_image - 5, government_friends: prev.government_friends - 5 })); return "The mayor understands, but is clearly disappointed. You hear whispers that you've forgotten where you came from ('lumaki na ang ulo')."; },
            }
        ]
    },
    {
        id: 'event_senate_hearing',
        title: 'An Invitation to the Senate',
        description: "You've been 'invited' to a Senate Blue Ribbon hearing on alleged industry-wide overpricing. Senator De Asis, an old 'friend', says he can help steer the questions away from you... for a price.",
        character: 'government_angry',
        background: 'bgOffice',
        choices: [
            {
                text: "Donate to the Senator's 'charitable foundation' (₱6,000,000).",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 6000000, morals: prev.morals - 15, government_friends: prev.government_friends + 10 })); return "During the hearing, the Senator praises your company as a 'model of Filipino enterprise'. The investigation focuses on your rivals."; }
            },
            {
                text: "Prepare with your lawyers and face the committee.",
                action: (stats, setStats) => {
                    if (stats.public_image > 60 && stats.morals > 50) {
                        setStats(prev => ({ ...prev, public_image: prev.public_image + 15, morals: prev.morals + 10 }));
                        return "You answer every question with confidence and evidence. The media portrays you as a persecuted, honest businessman. Your reputation soars.";
                    } else {
                        setStats(prev => ({ ...prev, public_image: prev.public_image - 20, government_friends: prev.government_friends - 15, company_climate: prev.company_climate - 10 }));
                        return "You stumble under the intense questioning. The headlines are brutal, and you are cited for contempt after a heated exchange.";
                    }
                }
            },
            {
                text: "Suddenly develop a 'medical emergency' to delay your appearance.",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, public_image: prev.public_image - 10, morals: prev.morals - 5 })); return "You are confined to a luxury hospital suite. The public is suspicious, but it buys you time to strategize. The committee reschedules your hearing."; }
            }
        ]
    },
    {
        id: 'event_visa_application',
        title: "Embassy Interview Woes",
        description: "Your daughter's student visa for her dream university in the US was denied. You know people who can 'expedite' the appeal process.",
        character: 'family_sad',
        background: 'bgMansion',
        choices: [
            {
                text: "Call your contact who knows the consul (₱2,500,000).",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 2500000, morals: prev.morals - 10, family_relations: prev.family_relations + 10 })); return "A week later, her visa is miraculously approved due to a 'clerical error' being overturned. Your daughter is overjoyed."; }
            },
            {
                text: "Ask your 'kumpadre' at the DFA to write a letter of recommendation.",
                isAvailable: (stats) => stats.government_friends > 50,
                action: (stats, setStats) => { setStats(prev => ({ ...prev, government_friends: prev.government_friends - 10, family_relations: prev.family_relations + 5, morals: prev.morals - 2 })); return "He makes a call. It's no guarantee, but it certainly helps. The appeal is now under 'special review'. You've used a significant favor."; }
            },
            {
                text: "Re-apply through the normal process. It's the proper way.",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, morals: prev.morals + 10, family_relations: prev.family_relations - 5 })); return "You file the paperwork again. It will take months, and her enrollment might be deferred. Your daughter is disappointed with your lack of 'diskarte'."; }
            }
        ]
    },
    {
        id: 'event_political_wedding',
        title: 'The Wedding of the Year',
        description: "The son of Governor Ignacio, a key political ally, is getting married. Being a 'ninong' (godparent) is an honor, but your invitation came with a 'suggested' gift registry that only lists one item: a brand new SUV.",
        character: 'government_normal',
        background: 'bgMansion',
        choices: [
            {
                text: "Gift the top-of-the-line SUV as requested (₱4,500,000).",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 4500000, government_friends: prev.government_friends + 15, morals: prev.morals - 10 })); return "The Governor gives you a hearty embrace at the reception, calling you 'true family'. Your place in his inner circle is secured."; }
            },
            {
                text: "Give a very generous cash gift instead (₱1,000,000).",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 1000000, government_friends: prev.government_friends + 5, public_image: prev.public_image - 2 })); return "The gift is accepted, but you notice the Governor is warmer to the 'ninong' who gave the luxury watch. You fulfilled your duty, but didn't impress."; }
            },
            {
                text: "Send a respectable appliance set and your sincerest regrets.",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 100000, government_friends: prev.government_friends - 15, public_image: prev.public_image - 5 })); return "Your absence and 'practical' gift are noted. You've snubbed a powerful dynasty, and they will not forget it."; }
            }
        ]
    },
    {
        id: 'event_environmental_issue',
        title: "DENR 'Inspection'",
        description: "The DENR is investigating your factory for dumping waste into a river. The inspector implies a hefty fine is inevitable, unless you help with their 'environmental protection fund'.",
        character: 'government_normal',
        background: 'bgConstruction',
        choices: [
            {
                text: "Donate to their 'fund' (₱3,000,000).",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 3000000, morals: prev.morals - 10 })); return "The inspector finds that your factory is using an 'advanced, previously unseen filtration method' and clears you of all charges."; }
            },
            {
                text: "Invest in a proper waste disposal system and pay the fine (₱8,000,000).",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 8000000, morals: prev.morals + 15, public_image: prev.public_image + 10, company_climate: prev.company_climate + 5 })); return "It's a massive expense, but you do the right thing. Your company wins a green certification, which you use in all your marketing."; }
            },
            {
                text: "Deny everything and use your connections to bury the case.",
                isAvailable: (stats) => stats.government_friends > 60,
                action: (stats, setStats) => { setStats(prev => ({ ...prev, government_friends: prev.government_friends - 15, morals: prev.morals - 20, public_image: prev.public_image - 10 })); return "You call a high-ranking official. The case is quietly dropped, but you've spent significant political capital and your reputation takes a hit."; }
            }
        ]
    },
    {
        id: 'event_union_busting',
        title: 'Whispers of a Union',
        description: "Your factory workers are organizing to form a union for better pay. Your HR head has a plan to 'manage' the situation by identifying and neutralizing the leaders.",
        character: 'worker_normal',
        background: 'bgOffice',
        choices: [
            {
                text: "Promote and reassign the union leaders. 'Divide and conquer'.",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 500000, company_climate: prev.company_climate - 15, morals: prev.morals - 10 })); return "The leaders accept cushy new jobs in remote provinces. The union movement loses its momentum, but employee trust is shattered."; }
            },
            {
                text: "Voluntarily give a company-wide raise and benefits increase.",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 4000000, company_climate: prev.company_climate + 10, morals: prev.morals + 5 })); return "The surprise announcement is met with cheers. The workers feel valued, and talk of a union dies down... for now."; }
            },
            {
                text: "Allow them to form the union and negotiate in good faith.",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, morals: prev.morals + 15, company_climate: prev.company_climate + 5 })); return "It's a bold move. Negotiations will be tough and may lead to future costs, but you gain respect for honoring workers' rights."; }
            }
        ]
    },
    {
        id: 'event_mainland_investors',
        title: 'The Mainland Investors',
        description: "A delegation of investors from a Chinese firm wants to partner on a massive new development. Their offer is huge, but they want majority control and to bring in their own management.",
        character: 'business_normal',
        background: 'bgOffice',
        choices: [
            {
                text: "Accept the deal. The money is too good to refuse!",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money + 50000000, company_climate: prev.company_climate - 10, morals: prev.morals - 5 })); return "The deal is signed and your bank account swells. However, your Filipino employees are uneasy about the new management."; }
            },
            {
                text: "Negotiate for a more equitable 50/50 partnership.",
                action: (stats, setStats) => {
                    if (Math.random() > 0.5) {
                        setStats(prev => ({ ...prev, money: prev.money + 20000000, company_climate: prev.company_climate + 5 }));
                        return "After tough negotiations, they agree to your terms! It's a landmark partnership.";
                    } else {
                        setStats(prev => ({ ...prev, public_image: prev.public_image - 5 }));
                        return "They find your terms insulting and walk away from the deal completely.";
                    }
                }
            },
            {
                text: "Decline politely. 'We prefer to keep our company Filipino-led.'",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, morals: prev.morals + 10, public_image: prev.public_image + 5, company_climate: prev.company_climate + 5 })); return "You walk away from a fortune, but your nationalist stance earns you praise in the media and boosts employee morale."; }
            }
        ]
    },
    {
        id: 'event_family_scandal',
        title: 'Your Son, the Influencer',
        description: "Your son posted an insensitive video from a yacht party, complaining about 'the poors'. It's going viral for all the wrong reasons. #Affluenza is trending.",
        character: 'family_angry',
        background: 'bgMansion',
        choices: [
            {
                text: "Hire a PR firm to scrub the internet and issue a fake apology (₱2,000,000).",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 2000000, public_image: prev.public_image + 5, morals: prev.morals - 5, family_relations: prev.family_relations - 5 })); return "The video is taken down and a carefully worded apology is released. The public moves on, but your son learned nothing."; }
            },
            {
                text: "Make him issue a genuine apology and do volunteer work, on camera.",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, public_image: prev.public_image + 10, morals: prev.morals + 10, family_relations: prev.family_relations - 10 })); return "He hates it, but does it. The public is surprisingly forgiving of the 'reformed' rich kid. It's a tough lesson for him."; }
            },
            {
                text: "Ignore it. Let the peasants rage. It will blow over.",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, public_image: prev.public_image - 20, family_relations: prev.family_relations + 5 })); return "The scandal gets worse. Your family name becomes synonymous with 'out-of-touch elite'. Your son, however, appreciates you not punishing him."; }
            }
        ]
    },
    {
        id: 'event_barangay_permit',
        title: 'Barangay Permit Problem',
        description: "You're building a new condo, but the Barangay Captain is holding up the permits, citing 'community complaints'. He mentions how expensive his son's campaign for SK Chairman is.",
        character: 'government_normal',
        background: 'bgOffice',
        choices: [
            {
                text: "Fund his son's 'SK campaign' and 'community projects' (₱1,000,000).",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 1000000, morals: prev.morals - 10, government_friends: prev.government_friends + 2 })); return "The permits are signed the next day. The 'community complaints' have mysteriously vanished."; }
            },
            {
                text: "Go over his head to your contact in the Mayor's office.",
                isAvailable: (stats) => stats.government_friends > 40,
                action: (stats, setStats) => { setStats(prev => ({ ...prev, government_friends: prev.government_friends - 5 })); return "The Mayor's office makes a call. The permits are released, but you've made a bitter enemy of the Barangay Captain."; }
            },
            {
                text: "Wait for the official process, causing construction delays.",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 2000000, morals: prev.morals + 10 })); return "You refuse to play the game. The project is delayed by three months, costing you millions in overhead, but your hands are clean."; }
            }
        ]
    },
    {
        id: 'event_rebar_dilemma',
        title: 'The Rebar Dilemma',
        description: "Your supplier offers a batch of imported rebar (steel bars) for 30% below market price. It's slightly below national quality standards, but would save you millions on your current high-rise project.",
        character: 'business_normal',
        background: 'bgConstruction',
        choices: [
            {
                text: "Use the cheaper rebar. Profit is profit.",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money + 7000000, morals: prev.morals - 25, company_climate: prev.company_climate - 5 })); return "The building goes up ahead of schedule and under budget. Only you and the engineer know about the compromise buried in the concrete."; }
            },
            {
                text: "Pay for premium, certified rebar. Safety is non-negotiable.",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, money: prev.money - 3000000, morals: prev.morals + 15, public_image: prev.public_image + 5 })); return "You spend the extra money for peace of mind. Your marketing team proudly advertises that you 'never cut corners' on safety."; }
            },
            {
                text: "Report the supplier to the Department of Trade and Industry.",
                action: (stats, setStats) => { setStats(prev => ({ ...prev, morals: prev.morals + 10, public_image: prev.public_image + 5 })); return "The DTI launches an investigation and seizes the substandard materials. You've made an enemy, but have protected the public."; }
            }
        ]
    }
];