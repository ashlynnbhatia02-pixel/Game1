/* ============================================================
   data/cases.js
   Difficulty ramps every ~15 levels:
     1-10:   hand-crafted (3 suspects)
     11-25:  3 suspects + distractor clues
     26-40:  4 suspects
     41-55:  4 suspects + 1 false clue
     56-70:  4 suspects + false clue + 90s timer
     71-85:  5 suspects + 2 false clues + timer
     86-100: 5 suspects + 2 false clues + 60s timer
   ============================================================ */

const handCrafted = [
  {
    level: 1,
    title: "The Library Murder",
    scene: `At <strong>9:42 PM</strong> last night, the body of <strong>Mr. Edgar Vance</strong> was discovered in the <strong>west wing of the city library</strong>. He had been struck over the head with a brass candlestick. The library was locked from the inside. Only three people had keys.`,
    clues: [
      "A muddy footprint was found near the body — size 10, men's dress shoe.",
      "The library's back door was unlocked. It rained heavily that evening.",
      "A torn piece of red fabric was caught on the candlestick.",
      "The night janitor says he saw a figure in a red coat leaving around 9:30 PM.",
      "Miss Holloway was seen at the theater until 9:15 PM — she wore a green dress.",
      "Mr. Ashford's shoe size is 10. He claims he was home all evening."
    ],
    suspects: [
      { name: "Miss Holloway", role: "Librarian",        avatar: "👩‍🦰", guilty: false },
      { name: "Mr. Ashford",   role: "Businessman",      avatar: "🧔",   guilty: true  },
      { name: "Dr. Crane",     role: "Family Physician", avatar: "👨‍⚕️", guilty: false }
    ]
  },
  {
    level: 2,
    title: "The Chef's Last Meal",
    scene: `Chef <strong>Antoine Berard</strong> collapsed at <strong>8:15 PM</strong> in his own kitchen, poisoned. He had been preparing a private dinner for three guests. The poison was in his wine glass — but the bottle was shared by everyone at the table.`,
    clues: [
      "The wine bottle contained no poison — only the chef's glass did.",
      "The chef always poured his own glass last, after his guests.",
      "Ms. Reyes was seen arguing with the chef earlier that day.",
      "Mr. Kaur has a background in chemistry.",
      "The glass had a faint residue of crushed sleeping pills.",
      "Mr. Kaur was seated closest to the wine bottle at the table."
    ],
    suspects: [
      { name: "Ms. Reyes",  role: "Food Critic", avatar: "👩",   guilty: false },
      { name: "Mr. Kaur",   role: "Chemist",     avatar: "🧑‍🔬", guilty: true  },
      { name: "Lady Finch", role: "Aristocrat",  avatar: "👵",   guilty: false }
    ]
  },
  {
    level: 3,
    title: "The Midnight Yacht",
    scene: `At <strong>midnight</strong>, <strong>Captain Reeves</strong> was found dead on the deck of his yacht, stabbed once in the back. The yacht was 3 miles offshore. Only three passengers were aboard.`,
    clues: [
      "The murder weapon was a fishing knife from the yacht's own galley.",
      "The captain's watch had stopped at 11:47 PM.",
      "Ms. Vaughn was seasick and bedridden all evening — the crew confirms it.",
      "Mr. Bishop had a cut on his hand he couldn't explain.",
      "The yacht's log shows the engines were off from 11:30 PM to midnight.",
      "Mr. Bishop had argued with the captain over a business deal that afternoon."
    ],
    suspects: [
      { name: "Ms. Vaughn", role: "Journalist",  avatar: "👩‍💼", guilty: false },
      { name: "Mr. Bishop", role: "Investor",    avatar: "🤵",   guilty: true  },
      { name: "Dr. Osei",   role: "Ship Doctor", avatar: "👨‍⚕️", guilty: false }
    ]
  },
  {
    level: 4,
    title: "The Silent Auction",
    scene: `During a charity auction at <strong>10:00 PM</strong>, <strong>Mrs. Delacroix</strong> was found dead in the coatroom, strangled with a silk scarf.`,
    clues: [
      "The scarf belonged to the victim herself.",
      "A witness saw Mr. Trent enter the coatroom at 9:50 PM.",
      "Mr. Trent claims he was bidding on a painting at 9:50 PM — the auctioneer confirms.",
      "The victim's diamond necklace was missing.",
      "Ms. Park was seen leaving the coatroom at 9:55 PM.",
      "Ms. Park has a history of theft and was recently released from prison."
    ],
    suspects: [
      { name: "Mr. Trent",  role: "Art Dealer",      avatar: "🧑‍🎨", guilty: false },
      { name: "Ms. Park",   role: "Antiques Expert", avatar: "👩",   guilty: true  },
      { name: "Lord Ashby", role: "Philanthropist",  avatar: "🎩",   guilty: false }
    ]
  },
  {
    level: 5,
    title: "The Greenhouse Poisoning",
    scene: `Botanist <strong>Dr. Iris Whitlock</strong> was found dead at <strong>7:00 AM</strong> in her own greenhouse, poisoned by a rare plant toxin.`,
    clues: [
      "The toxin came from a plant that only blooms at night.",
      "The greenhouse's automatic lights were on until 11 PM.",
      "Dr. Voss was working late in the adjacent lab that night.",
      "Dr. Voss's lab coat had traces of the same plant on the sleeve.",
      "Ms. Cheng was on a video call with a colleague until midnight.",
      "Dr. Whitlock had recently rejected Dr. Voss's research proposal."
    ],
    suspects: [
      { name: "Dr. Voss",     role: "Rival Botanist",     avatar: "🧑‍🔬", guilty: true  },
      { name: "Ms. Cheng",    role: "Research Assistant", avatar: "👩‍🔬", guilty: false },
      { name: "Mr. Adesanya", role: "Groundskeeper",      avatar: "👨‍🌾", guilty: false }
    ]
  },
  {
    level: 6,
    title: "The Casino Chips",
    scene: `At <strong>2:30 AM</strong>, casino owner <strong>Mr. Salvatore</strong> was found dead in his private office, shot once. Security footage shows only three people entered the floor.`,
    clues: [
      "The gun was found in a vent, wiped clean.",
      "Ms. Delgado was seen leaving the floor at 2:15 AM.",
      "Ms. Delgado's purse contained a large amount of casino chips.",
      "Mr. Wang lost a fortune at the tables that night.",
      "The security camera outside the office was disabled at 2:20 AM.",
      "Mr. Wang was seen on camera at the blackjack table at 2:25 AM."
    ],
    suspects: [
      { name: "Ms. Delgado", role: "Croupier",         avatar: "👩",  guilty: true  },
      { name: "Mr. Wang",    role: "High Roller",      avatar: "🧑",  guilty: false },
      { name: "Mr. Okafor",  role: "Head of Security", avatar: "💼",  guilty: false }
    ]
  },
  {
    level: 7,
    title: "The Theatre Dressing Room",
    scene: `After the final curtain at <strong>11:00 PM</strong>, lead actress <strong>Miss Duval</strong> was found dead in her dressing room.`,
    clues: [
      "The mirror was cracked in a way that suggests a left-handed swing.",
      "The stage manager, Mr. Bell, is left-handed.",
      "Miss Duval had just been offered the role Mr. Bell had wanted for years.",
      "Miss Duval's understudy, Ms. Lane, was seen crying after the show.",
      "Ms. Lane had an alibi — she was on stage during the murder window.",
      "Mr. Bell was seen near Miss Duval's dressing room at 10:50 PM."
    ],
    suspects: [
      { name: "Mr. Bell",  role: "Stage Manager",    avatar: "🧑‍🎭", guilty: true  },
      { name: "Ms. Lane",  role: "Understudy",       avatar: "👩‍🎤", guilty: false },
      { name: "Mr. Rossi", role: "Costume Designer", avatar: "🧵",   guilty: false }
    ]
  },
  {
    level: 8,
    title: "The Mountain Lodge",
    scene: `A blizzard trapped six guests at a mountain lodge. At <strong>3:00 AM</strong>, <strong>Mr. Halvorsen</strong> was found dead in the snow outside.`,
    clues: [
      "Mr. Halvorsen was afraid of heights and never went on balconies.",
      "A footprint in the snow matched Ms. Vinter's boots.",
      "Ms. Vinter's boots are a common brand — half the guests own the same pair.",
      "Mr. Lindqvist was seen arguing with the victim at dinner.",
      "Mr. Lindqvist has a broken leg and cannot climb stairs.",
      "Ms. Vinter was the only guest who knew the victim personally before the trip."
    ],
    suspects: [
      { name: "Ms. Vinter",    role: "Old Friend",  avatar: "👩", guilty: true  },
      { name: "Mr. Lindqvist", role: "Businessman", avatar: "🧑", guilty: false },
      { name: "Mrs. Sørensen", role: "Innkeeper",   avatar: "👵", guilty: false }
    ]
  },
  {
    level: 9,
    title: "The University Lab",
    scene: `At <strong>1:00 PM</strong>, <strong>Professor Adeyemi</strong> was found dead in her locked lab, electrocuted by a rigged piece of equipment.`,
    clues: [
      "The rigged equipment was set to trigger when the lab's power was next turned on.",
      "The lab's power was turned off for maintenance at noon and back on at 12:55 PM.",
      "Only Dr. Okonkwo knew about the maintenance schedule in advance.",
      "Dr. Okonkwo and the victim were competing for the same research grant.",
      "Ms. Petrov's keycard logged entry at 12:10 PM — she says she forgot her lunch.",
      "Mr. Nakamura's keycard logged entry at 11:00 AM — he says he picked up a book."
    ],
    suspects: [
      { name: "Dr. Okonkwo",  role: "Rival Professor", avatar: "🧑‍🏫", guilty: true  },
      { name: "Ms. Petrov",   role: "PhD Student",     avatar: "👩‍🎓", guilty: false },
      { name: "Mr. Nakamura", role: "Lab Technician",  avatar: "🧑‍🔧", guilty: false }
    ]
  },
  {
    level: 10,
    title: "The Final Interview",
    scene: `Talk-show host <strong>Mr. Kane</strong> was found dead in his studio at <strong>9:00 PM</strong>, minutes after his live broadcast ended.`,
    clues: [
      "The poison was in a glass of water on Mr. Kane's desk.",
      "The water was poured by the studio's assistant, who was on camera the whole time.",
      "Ms. Ito was the last guest to shake Mr. Kane's hand.",
      "Ms. Ito had been publicly humiliated by Mr. Kane on air years ago.",
      "Mr. Crane was visibly upset after his interview and left early.",
      "Mr. Crane's alibi — a taxi ride — is confirmed by GPS records."
    ],
    suspects: [
      { name: "Ms. Ito",      role: "Former Actress", avatar: "👩", guilty: true  },
      { name: "Mr. Crane",    role: "Politician",     avatar: "🤵", guilty: false },
      { name: "Ms. Beaumont", role: "Musician",       avatar: "🎤", guilty: false }
    ]
  }
];

/* ---------- PROCEDURAL GENERATION (11-100) ---------- */

const FIRST_NAMES = [
  "Alexander","Beatrice","Carlos","Diana","Elias","Fiona","Gregor","Helena",
  "Ivan","Julia","Klaus","Lena","Marcus","Nadia","Otto","Priya","Quentin",
  "Rosa","Stefan","Tessa","Umar","Vera","Wesley","Ximena","Yusuf","Zara",
  "Amara","Boris","Camille","Dmitri","Elena","Felix","Greta","Hassan",
  "Ines","Jonas","Katya","Lucia","Mateo","Noor","Omar","Petra","Rafael",
  "Sofia","Tomas","Ursula","Viktor","Wren"
];

const LAST_NAMES = [
  "Voss","Kaur","Reyes","Finch","Bishop","Vaughn","Osei","Park","Trent",
  "Ashby","Whitlock","Cheng","Adesanya","Delgado","Wang","Okafor","Bell",
  "Lane","Rossi","Halvorsen","Vinter","Lindqvist","Sørensen","Okonkwo",
  "Petrov","Nakamura","Ito","Crane","Beaumont","Marchetti","Duarte",
  "Eriksen","Falk","Grieg","Hollis","Ibsen","Jansen","Kovač","Laurent",
  "Mercer","Nyberg","Ortega","Pahlavi","Quinn","Rasmussen","Strand","Tolstoy"
];

const ROLES = [
  "Businessman","Journalist","Doctor","Lawyer","Chef","Artist","Professor",
  "Diplomat","Engineer","Collector","Critic","Photographer","Musician",
  "Architect","Investor","Editor","Curator","Pilot","Nurse","Consultant"
];

const AVATARS = ["🧔","👩","👨","👩‍🦰","🧑","👵","👴","🧑‍💼","👩‍💼","🧑‍🔬"];

const LOCATIONS = [
  "a private mansion","a luxury hotel suite","a country estate",
  "a downtown penthouse","a historic theatre","an art gallery",
  "a research laboratory","a remote cabin","a cruise ship",
  "a private club","a vineyard","a ski resort","an opera house",
  "a monastery","a casino","a museum","a botanical garden",
  "a television studio","a recording studio","a private library"
];

const WEAPONS = [
  "a brass candlestick","a poisoned drink","a letter opener",
  "a silk scarf","a heavy statuette","a kitchen knife",
  "a length of rope","a blunt instrument","a rare toxin",
  "a ceremonial dagger","a fireplace poker","a broken bottle"
];

const TIMES = ["7:15 PM","8:30 PM","9:42 PM","10:00 PM","11:20 PM","midnight","2:30 AM","6:45 AM"];

/* ---------- Difficulty tiers ---------- */

function getDifficultyForLevel(level) {
  if (level <= 10)  return { suspects: 3, clueCount: 6,  falseClues: 0, timeLimit: 0 };
  if (level <= 25)  return { suspects: 3, clueCount: 8,  falseClues: 0, timeLimit: 0 };
  if (level <= 40)  return { suspects: 4, clueCount: 8,  falseClues: 0, timeLimit: 0 };
  if (level <= 55)  return { suspects: 4, clueCount: 9,  falseClues: 1, timeLimit: 0 };
  if (level <= 70)  return { suspects: 4, clueCount: 9,  falseClues: 1, timeLimit: 90 };
  if (level <= 85)  return { suspects: 5, clueCount: 10, falseClues: 2, timeLimit: 90 };
  return              { suspects: 5, clueCount: 10, falseClues: 2, timeLimit: 60 };
}

/* ---------- RNG ---------- */

function makeRng(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function pick(arr, rng) {
  return arr[Math.floor(rng() * arr.length)];
}

function pickN(arr, n, rng) {
  const copy = [...arr];
  const out = [];
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(rng() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}

/* ---------- Case generation ---------- */

function generateCase(level) {
  const rng = makeRng(level * 7919);
  const diff = getDifficultyForLevel(level);

  const names    = pickN(FIRST_NAMES, diff.suspects, rng);
  const surnames = pickN(LAST_NAMES,  diff.suspects, rng);
  const roles    = pickN(ROLES,       diff.suspects, rng);
  const avatars  = pickN(AVATARS,     diff.suspects, rng);

  const suspects = names.map((first, i) => ({
    name: `${first} ${surnames[i]}`,
    role: roles[i],
    avatar: avatars[i],
    guilty: false
  }));

  const guiltyIndex = Math.floor(rng() * diff.suspects);
  suspects[guiltyIndex].guilty = true;

  const victimName = `Mr. ${pick(FIRST_NAMES, rng)} ${pick(LAST_NAMES, rng)}`;
  const location   = pick(LOCATIONS, rng);
  const weapon     = pick(WEAPONS, rng);
  const time       = pick(TIMES, rng);

  const scene = `At <strong>${time}</strong>, the body of <strong>${victimName}</strong> was discovered at <strong>${location}</strong>. The cause of death was ${weapon}. Only ${diff.suspects} people had both motive and opportunity.`;

  const clues = buildClues(suspects, guiltyIndex, diff, rng);

  return {
    level,
    title: `The ${location.replace(/^an? /, "").replace(/\b\w/g, c => c.toUpperCase())} Affair`,
    scene,
    clues,
    suspects,
    timeLimit: diff.timeLimit
  };
}

function buildClues(suspects, guiltyIndex, diff, rng) {
  const guilty = suspects[guiltyIndex];
  const innocents = suspects.filter((_, i) => i !== guiltyIndex);

  const evidence = [];

  // Two strong clues → guilty
  evidence.push({ text: `${guilty.name} was seen near the scene at the time of death.`, unreliable: false });
  evidence.push({ text: `A witness reports ${guilty.name}'s alibi does not hold up.`, unreliable: false });

  // Cleansing clues for each innocent
  innocents.forEach(inn => {
    evidence.push({ text: `${inn.name} was confirmed elsewhere by multiple witnesses.`, unreliable: false });
  });

  // Distractor (unreliable) clues
  const filler = [
    `${guilty.name} had argued with the victim earlier that week.`,
    `The victim had recently changed their will.`,
    `A locked door was found open — suggesting an inside job.`,
    `The victim's phone showed a deleted message from an unknown number.`,
    `Footprints were found that did not match any guest's shoes.`,
    `A staff member reported hearing raised voices shortly before the death.`,
    `The victim was planning to fire someone — the name was not recorded.`,
    `A broken vase near the scene suggests a struggle.`
  ];

  // Add false clues (marked unreliable) — harder to reason about
  const falseClues = [
    `An anonymous tip claims ${innocents[0].name} was at the scene — the tip was later retracted.`,
    `A witness originally named ${innocents[1] ? innocents[1].name : innocents[0].name}, but changed their story twice.`,
    `A forged note was found, attempting to frame another suspect.`
  ];

  for (let i = 0; i < diff.falseClues; i++) {
    evidence.push({ text: falseClues[i], unreliable: true });
  }

  while (evidence.length < diff.clueCount && filler.length > 0) {
    const idx = Math.floor(rng() * filler.length);
    evidence.push({ text: filler.splice(idx, 1)[0], unreliable: false });
  }

  // Shuffle
  for (let i = evidence.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [evidence[i], evidence[j]] = [evidence[j], evidence[i]];
  }

  return evidence;
}

/* ---------- Exports ---------- */

export const CASES = [
  ...handCrafted.map(c => ({
    ...c,
    // Convert hand-crafted clues (strings) to objects for consistency
    clues: c.clues.map(text => ({ text, unreliable: false })),
    timeLimit: 0
  })),
  ...Array.from({ length: 90 }, (_, i) => generateCase(11 + i))
];

export function getCaseByLevel(level) {
  return CASES.find(c => c.level === level) || CASES[0];
}

export function getTotalLevels() {
  return CASES.length;
}
