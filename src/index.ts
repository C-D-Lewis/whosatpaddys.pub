import { ChipRow, ResultsList, Separator, SiteTitle, Subtitle } from './components';
import { AppState, Episode, Countable } from './types';
import { Fabricate } from '../node_modules/fabricate.js/types/fabricate';

declare const fabricate: Fabricate<AppState>;

/**
 * Sort countable entities.
 *
 * @param {Countable} a - Comparable entitiy.
 * @param {Countable} b - Comparable entitiy.
 * @returns {number} Sort value.
 */
const sortByCount = (a: Countable, b: Countable) => a.count > b.count ? -1 : 1;

/**
 * Fetch the episode data file.
 *
 * @returns {Promise<void>}
 */
const fetchData = async () => {
  const episodes: Episode[] = await fetch('assets/episodes.json').then((r) => r.json());

  const allCharacters: Countable[] = [];
  const allWriters: Countable[] = [];
  const allTags: Countable[] = [];

  // Gather all characters, writers, tags
  episodes.forEach(({ characters, writers, tags }) => {
    characters.forEach((c) => {
      const found = allCharacters.find(({ name }) => c === name);
      if (!found) {
        allCharacters.push({ name: c, count: 1 });
      } else {
        found.count += 1;
      }
    });

    writers.forEach((c) => {
      const found = allWriters.find(({ name }) => c === name);
      if (!found) {
        allWriters.push({ name: c, count: 1 });
      } else {
        found.count += 1;
      }
    });

    tags.forEach((t) => {
      const found = allTags.find(({ name }) => t === name);
      if (!found) {
        allTags.push({ name: t, count: 1 });
      } else {
        found.count += 1;
      }
    });
  });

  fabricate.update({
    episodes,
    allCharacters: allCharacters.sort(sortByCount),
    allWriters: allWriters.sort(sortByCount),
    allTags: allTags.sort(sortByCount),
  });
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
 * @returns {FabricateComponent} Fabricate component.
 */
const App = () => fabricate('Column')
  .setStyles({
    maxWidth: '1000px',
    margin: fabricate.isNarrow() ? '10px' : '10px auto',
  })
  .setChildren([
    SiteTitle(),
    Separator(),
    Subtitle().setText('With characters:'),
    ChipRow({ type: 'characters' }),
    Subtitle().setText('By writers:'),
    ChipRow({ type: 'writers' }),
    Subtitle().setText('With tags:'),
    ChipRow({ type: 'tags' }),
    Separator(),
    Subtitle()
      .setStyles({ textAlign: 'center' })
      .onUpdate((el, { results }) => el.setText(`Found ${results.length} results:`))
      .when((state: AppState) => state.results && state.results.length > 0),
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

fabricate.app(App(), initialState);

fetchData();
