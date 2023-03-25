import { ChipRow, ResultsList, SiteTitle, Subtitle } from './components';
import { AppState, Episode, Fabricate } from './types';

declare const fabricate: Fabricate;

/**
 * Fetch the episode data file.
 *
 * @returns {Promise<void>}
 */
const fetchData = async () => {
  const episodes: Episode[] = await fetch('assets/episodes.json').then((r) => r.json());

  // Gather all characters and writers
  const allCharacters: string[] = [];
  const allWriters: string[] = [];
  episodes.forEach(({ characters, writers }) => {
    allCharacters.push(...characters.filter((c) => !allCharacters.includes(c)));
    allWriters.push(...writers.filter((w) => !allWriters.includes(w)));
  });

  fabricate.update({ episodes, allCharacters, allWriters });
};

/**
 * Update results because selections changed.
 *
 * @param {AppState} state - App state.
 */
const updateResults = (state: AppState) => {
  const { selectedCharacters, selectedWriters, episodes } = state;
  if (!selectedCharacters.length && !selectedWriters.length) {
    fabricate.update({ results: [] });
    return;
  }

  /**
   * Determine if episode matches selected characters (if selections exist).
   *
   * @param {Episode} e - Episode.
   * @returns {boolean} true if all selected characters appear in this episode.
   */
  const matchesCharacters = (e: Episode) => selectedCharacters.length && selectedCharacters.every((c) => e.characters.includes(c));

  /**
   * Determine if episode matches selected writers (if selections exist).
   *
   * @param {Episode} e - Episode.
   * @returns {boolean} true if all selected writers wrote this episode.
   */
  const matchesWriters = (e: Episode) => selectedWriters.length && selectedWriters.every((w) => e.writers.includes(w));

  const results = episodes.filter((e) => selectedCharacters.length && selectedWriters.length
    ? matchesCharacters(e) && matchesWriters(e)
    : matchesCharacters(e) || matchesWriters(e)
  );
  fabricate.update({ results });
};

/**
 * App component.
 *
 * @returns {HTMLElement} Fabricate component.
 */
const App = () => fabricate('Column')
  .setStyles({
    maxWidth: '1000px',
    margin: fabricate.isNarrow() ? '10px' : '10px auto',
  })
  .setChildren([
    SiteTitle(),
    Subtitle().setText('With characters:'),
    ChipRow({ type: 'characters' }),
    Subtitle().setText('By writers:'),
    ChipRow({ type: 'writers' }),
    Subtitle()
      .setStyles({ textAlign: 'center' })
      .onUpdate((el, { results }) => el.setText(`Found ${results.length} results:`))
      .when((state) => state.results && state.results.length),
    ResultsList(),
  ])
  .onUpdate((el, state) => {
    updateResults(state);
  }, ['selectedCharacters', 'selectedWriters']);

const initialState: AppState = {
  episodes: [],
  allCharacters: [],
  allWriters: [],
  results: [],
  selectedCharacters: [],
  selectedWriters: [],
};
fabricate.app(App(), initialState)

fetchData();
