export type PartyLetter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'h';

export interface Party {
  letter: PartyLetter;
  name: string;
  color: string;
}

export interface Candidate {
  id: string;
  name: string;
  party: PartyLetter;
  listNumber: number;
}

export interface Election {
  id: string;
  name: string;
  shortName: string;
  date: string;
  parties: Party[];
  candidates: Candidate[];
}

const partiesAll: Party[] = [
  { letter: 'a', name: 'Fólkaflokkurin', color: '#4cb05a' },
  { letter: 'b', name: 'Sambandsflokkurin', color: '#0c6889' },
  { letter: 'c', name: 'Javnaðarflokkurin', color: '#a73033' },
  { letter: 'd', name: 'Sjálvstýri', color: '#ce579b' },
  { letter: 'e', name: 'Tjóðveldi', color: '#1d5062' },
  { letter: 'f', name: 'Framsókn', color: '#f59c00' },
  { letter: 'h', name: 'Miðflokkurin', color: '#007cc2' },
];

const partiesFolkating: Party[] = partiesAll.filter(p =>
  ['a', 'b', 'c', 'e', 'h'].includes(p.letter),
);

function makeCandidates(party: PartyLetter, names: string[]): Candidate[] {
  return names.map((name, i) => ({
    id: `logt-${party}-${i + 1}`,
    name,
    party,
    listNumber: i + 1,
  }));
}

function makeFTCandidates(party: PartyLetter, names: string[]): Candidate[] {
  return names.map((name, i) => ({
    id: `folk-${party}-${i + 1}`,
    name,
    party,
    listNumber: i + 1,
  }));
}

const logtingCandidates: Candidate[] = [
  ...makeCandidates('a', [
    'Annfinn Hjelm', 'Árni Skaale', 'Astrid Breckmann', 'Bárður á Lakjuni', 'Beinir Johannesen',
    'Bill Justinussen', 'Birgir Nielsen', 'Birita Lamhauge Jóansdóttir', 'Elsebeth Mercedis Gunnleygsdóttir',
    'Erling Mørkøre', 'Eyðun Jákupsson Tausen', 'Fía Selma Nielsen', 'Fróði Hammer', 'Fróði Magnussen',
    'Grímur Sundstein', 'Hans Pauli Henryson', 'Jacob Vestergaard', 'Jan Vestergaard', 'Jannie Dam Jacobsen',
    'Jessica Cazabon Celibashi', 'Jóhanna Andreasen', 'Jørgen Niclasen', 'Kristian Krog Hentze',
    'Leivur Simonsen', 'Marni Eyðolvsson Joensen', 'Niels Jacob Heinesen', 'Rannvá Isaksen',
    'Rósa Tyril Gaardlykke', 'Rúna Wenningsted Hansen', 'Rúni Hammer', 'Ruth Fjallsá Benbakoura',
    'Steffan Abrahamsson Løkin', 'Tummas í Garði', 'Uni Rasmussen',
  ]),
  ...makeCandidates('b', [
    'Áki Stenberg', 'Anna Falkenberg', 'Annfinn Brekkstein', 'Arnar Lognberg', 'Árni Klein Olsen',
    'Atli Fróði Johansen', 'Bárður á Steig Nielsen', 'Birgir Ferjá Heldarskarð', 'Eivin Sigurð Breiðaskarð',
    'Elinborg Osvaldsdóttir', 'Erhard Joensen', 'Eyðdis Hartmann Niclasen', 'Hans Jacob Langgaard',
    'Hans Kári Hansen', 'Haraldur Símunarson Hammer', 'Helgi Abrahamsen', 'Hermann R. Samuelsen',
    'Ingvør Skaalum', 'Jens Jákup Hansen', 'Jóan Petur Joensen', 'Johan Dahl', 'Jónleyg Jespersen Bech',
    'Kristina Djurhuus', 'Lív Reinert Nielsen', 'Magni Højgaard', 'Martin Drangberg',
    'Rannvá Dahl Djurhuus', 'Sonja Petersen', 'Sunnvá Dahl Høgfeldt',
  ]),
  ...makeCandidates('c', [
    'Aksel Vilhelmson Johannesen', 'Amanda Elisabeth Garðalíð', 'Ben Arabo', 'Bjarni Hammer',
    'Bjørt Lind', 'Dagfinn Olsen', 'Djóni Nolsøe Joensen', 'Edith Dahl Jakobsen', 'Elin Hentze',
    'Eyðgunn Samuelsen', 'Fróði Reinert Petersen', 'Gunnvá Tróndardóttir Joensen',
    'Hans Jacob Thomsen', 'Helena F. Jørmundsson', 'Heri Wang Danielsen', 'Ivan Hentze Niclasen',
    'Jákup á Dul Sørensen', 'Jóhanna Jancyardóttir', 'Jóhannis Joensen', 'Kristianna Winther Poulsen',
    'Laura Kathrine Apol', 'Margit Stórá', 'Ólavur Fríði Nybo', 'Petur Simonsen', 'Regin Ejdesgaard',
    'René Karbech Rasmussen', 'Sára Gullfoss', 'Sigrun Jónsveinsdóttir', 'Súsanna Bertholdsen',
  ]),
  ...makeCandidates('d', [
    'Andrias Jacobsen', 'Birgar Larsen', 'Claus Martin í Grund', 'Jógvan Hovshólm',
    'Jóhan Marni Stenberg', 'Pól Arni Holm', 'Randi Meitil', 'Rúni Jacobsen',
    'Sámal Petur Martinsson í Grund', 'Sylvia Thomsen',
  ]),
  ...makeCandidates('e', [
    'Anfinn í Toft', 'Annika Olsen', 'Ásla Leila B. Johansen',
    'Bjørg Súsanna Brynhildardóttir Egholm', 'Bjørk Berg Wiggins', 'Brandar Heðinsson',
    'Dennis Holm', 'Eirikur í Jákupsstovu', 'Erling Eidesgaard', 'Hendrik Egholm',
    'Hergeir Teitsson', 'Hervør Pálsdóttir', 'Høgni Karsten Hoydal', 'Jóhan Christiansen',
    'Jóhanna Paula við Streym', 'Kim Hansen', 'Liljan Weihe', 'Luna Klein Joensen',
    'Magnus Gaard', 'Marin í Dali', 'Pætur Weihe Simonsen', 'Rakul í Gerðinum',
    'Sigrid Jensdóttir Dalsgaard', 'Sirið Stenberg', 'Steinbjørn Hardlei',
    'Tjóðhild Patursson', 'Vígdis Bjarnadóttir',
  ]),
  ...makeCandidates('f', [
    'Annika Ró Samuelsen', 'Árni Matras Dam', 'Beinta Løwe', 'Bjarni Kárason Petersen',
    'Christoffur Gert Nielsen', 'Esmar Joensen', 'Gunnvá Winther', 'Jaspur Jacobsen',
    'Karlot Hergeirsson', 'Marin Jakobsen', 'Michael Antony Carles Johannesen',
    'Nena Jákupsdóttir', 'Ruth Vang', 'Súsanna Olsen',
  ]),
  ...makeCandidates('h', [
    'Anna Margretha Otthamar', 'Bjørg av Rana Nietschke', 'Finngerð Sunnrid Djurhuus Olsen',
    'Jann Johannesen', 'Jenis av Rana', 'Jens Knudsen', 'Markus Mortensen',
    'Matilda Sivertsen Gabriel', 'Mattias Ljósheim', 'Ólavur í Geil',
    'Petur Takamasa á Geilini Asano', 'Rani Andrasson Skaalum', 'Sámal Hanni Lognberg',
    'Sonni Jacobsen', 'Steffan Klein Poulsen', 'Vilhelm Hendrik í Skálanum', 'Vinjard Johansen',
  ]),
];

const folkatingCandidates: Candidate[] = [
  ...makeFTCandidates('a', [
    'Astrið Breckmann', 'Árni Skaale', 'Bárður á Lakjuni', 'Beinir Johannesen',
    'Elsebeth Mercedis Gunnleygsdóttir', 'Fía Selma Nielsen', 'Jacob Vestergaard',
    'Jørgen Niclasen', 'Símun Jóanesarson Hansen',
  ]),
  ...makeFTCandidates('b', [
    'Anna Falkenberg', 'Atli Fróði Johansen', 'Áki Stenberg', 'Bárður á Steig Nielsen',
    'Erhard Joensen', 'Eyðdis Hartmann Niclasen', 'Haraldur Símunarson Hammer', 'Helgi Abrahamsen',
    'Hermann R. Samuelsen', 'Ingvør Skaalum', 'Johan Dahl', 'Jóan Petur Joensen',
    'Lív Reinert Nielsen', 'Martin Drangberg', 'Rannvá Dahl Djurhuus',
  ]),
  ...makeFTCandidates('c', [
    'Artur Johansen', 'Birna Heinesen', 'Heini Kristiansen', 'Kim Durhuus',
    'Ólavur Larsen', 'Óli Jákup Jacobsen', 'Signhild Vilhelmsdóttir Johannesen',
    'Sjúrður Skaale', 'Sólfríð Bech Hammerfoss',
  ]),
  ...makeFTCandidates('e', [
    'Annika Olsen', 'Dennis Holm', 'Eirikur í Jákupsstovu', 'Hervør Pálsdóttir',
    'Høgni Karsten Hoydal', 'Jóhannis Erlendsson', 'Liljan Weihe', 'Sirið Stenberg',
  ]),
  ...makeFTCandidates('h', [
    'Anna Margretha Otthamar', 'Finngerð Sunnrid Djurhuus Olsen', 'Jenis av Rana',
    'Jens Knudsen', 'Markus Mortensen', 'Mattias Ljósheim', 'Ólavur í Geil',
    'Petur Takamasa á Geilini Asano', 'Sámal Hanni Lognberg', 'Steffan Klein Poulsen',
    'Vinjard Johansen',
  ]),
];

export const elections: Election[] = [
  {
    id: 'logtingsval',
    name: 'Løgtingsvalið 2026',
    shortName: 'Løgtingsval',
    date: '26. mars 2026',
    parties: partiesAll,
    candidates: logtingCandidates,
  },
  {
    id: 'folkatingval',
    name: 'Fólkatingsvalið 2026',
    shortName: 'Fólkatingsval',
    date: '24. mars 2026',
    parties: partiesFolkating,
    candidates: folkatingCandidates,
  },
];
