/** Tags */
export type Tag = 'Song' | 'Scheme' | 'Scam' | 'Special' | 'Flashback' | 'Camera';

/** Characters */
export type Character = 'Dennis' | 'Mac' | 'Charlie' | 'Dee' | 'Frank' | 'Bill' | 'Z' |
  'Carmen' | 'Cricket' | 'Lil\' Kev' | 'Ben' | 'Rex' | 'Waitress' | 'Artemis' |
  'Lawyer' | 'Mrs Mac' | 'Mrs Kelly' | 'Luther' | 'Pepper Jack' | 'Hwang' |
  'Uncle Jack' | 'Barbara' | 'McPoyles' | 'Bruce' | 'Maureen' | 'Waiter' |
  'Gail' | 'Ingrid' | 'Jackie' | 'Maniac';

/** Writers */
export type Writer = 'Day' | 'Howerton' | 'McElhenney' | 'Hornsby' | 'Marder' |
  'Rosell' | 'Rakhe' | 'Sielaff' | 'Mann' | 'Chernin' | 'Romano' | 'Falconer' |
  'Young' | 'Aron' | 'Lee' | 'Walsh' | 'Stein' | 'Sethi' | 'Weiss' | 'Benioff' |
  'Ledgin' | 'Covington' | 'Galvin' | 'Silberman' | 'Phirman' | 'Schneider' |
  'Ganz' | 'Ryan' | 'Weinstock' | 'Jones' | 'Taylor' | 'Pedrad' | 'K. McElhenney' |
  'Kop' | 'Maloney';

/** Episode */
export type Episode = {
  season: string;
  episode: string;
  title: string;
  characters: Character[];
  writers: Writer[];
  tags: Tag[];
};

/** Entity types that can be searched */
export type Searchable = Character | Writer | Tag;

/** Named sum entity */
export type Countable = {
  name: Searchable;
  count: number;
};

/** State of the fabricate.js app */
export type AppState = {
  [key: string]: string[] | Episode[] | Countable[] | string;

  episodes: Episode[];
  allCharacters: Countable[];
  allWriters: Countable[];
  allTags: Countable[];
  results: Episode[];
  selectedCharacters: Character[];
  selectedWriters: Writer[];
  selectedTags: Tag[];
};
