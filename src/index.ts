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

  // Gather all characters, writers, tags
  const allCharacters: string[] = [];
  const allWriters: string[] = [];
  const allTags: string[] = [];
  episodes.forEach(({ characters, writers, tags }) => {
    allCharacters.push(...characters.filter((p) => !allCharacters.includes(p)));
    allWriters.push(...writers.filter((p) => !allWriters.includes(p)));
    allTags.push(...tags.filter((p) => !allTags.includes(p)));
  });

  fabricate.update({ episodes, allCharacters, allWriters, allTags });
};

/**
 * Update results because selections changed.
 *
 * @param {AppState} state - App state.
 */
const updateResults = (state: AppState) => {
  const { episodes, selectedCharacters, selectedWriters, selectedTags } = state;

  // Nothing chosen yet
  if (!selectedCharacters.length && !selectedWriters.length && !selectedTags.length) {
    fabricate.update({ results: [] });
    return;
  }

  /**
   * Generic matcher for selected lists against lists in Episode.
   *
   * @param {Episode} e - Episode to match.
   * @param {string} epKey - Key in episode that contains list to compare against.
   * @param {string[]} stateList - List of selections from the state.
   * @returns {boolean} true if this Episode should match.
   */
  const genericMatch = (e: Episode, epKey: string, stateList: string[]) =>
    !stateList.length || stateList.every(p => e[epKey as keyof Episode].includes(p));

  const matchesCharacters = (e: Episode) => genericMatch(e, 'characters', selectedCharacters);
  const matchesWriters = (e: Episode) => genericMatch(e, 'writers', selectedWriters);
  const matchesTags = (e: Episode) => genericMatch(e, 'tags', selectedTags);

  const results = episodes.filter((e) => matchesCharacters(e) && matchesWriters(e) && matchesTags(e));
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
    Subtitle().setText('With tags:'),
    ChipRow({ type: 'tags' }),
    Subtitle()
      .setStyles({ textAlign: 'center' })
      .onUpdate((el, { results }) => el.setText(`Found ${results.length} results:`))
      .when((state) => state.results && state.results.length),
    ResultsList(),
  ])
  .onUpdate((el, state) => {
    updateResults(state);
  }, ['selectedCharacters', 'selectedWriters', 'selectedTags']);

const initialState: AppState = {
  episodes: [],
  allCharacters: [],
  allWriters: [],
  allTags: [],
  results: [],
  selectedCharacters: [],
  selectedWriters: [],
  selectedTags: [],
};
fabricate.app(App(), initialState)

fetchData();
