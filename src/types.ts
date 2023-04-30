/** Compiled episode */
export type Episode = {
  season: string;
  episode: string;
  title: string;
  characters: string[];
  writers: string[];
  tags: string[];
}

/** Named sum entity */
export type Countable = {
  name: string;
  count: number; 
}

/** State of the fabricate.js app */
export type AppState = {
  [key: string]: string[] | Episode[] | Countable[] | string;

  episodes: Episode[];
  allCharacters: Countable[];
  allWriters: Countable[];
  allTags: Countable[];
  results: Episode[];
  selectedCharacters: string[];
  selectedWriters: string[];
  selectedTags: string[];
}
