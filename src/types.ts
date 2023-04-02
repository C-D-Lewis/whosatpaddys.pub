/** Compiled episode */
export type Episode = {
  season: string;
  episode: string;
  title: string;
  characters: string[];
  writers: string[];
  tags: string[];
}

/** State of the fabricate.js app */
export type AppState = {
  episodes: Episode[];
  allCharacters: string[];
  allWriters: string[];
  allTags: string[];
  results: Episode[];
  selectedCharacters: string[];
  selectedWriters: string[];
  selectedTags: string[];
}
