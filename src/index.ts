import { ChipRow, Footer, ResultsList, Separator, SiteTitle, Subtitle } from './components';
import { AppState, Episode, Countable, Searchable } from './types';
import { Fabricate } from '../node_modules/fabricate.js/types/fabricate';
import { EPISODES } from './episodes';
import { Theme } from './theme';

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
  const allCharacters: Countable[] = [];
  const allWriters: Countable[] = [];
  const allTags: Countable[] = [];

  // Gather all characters, writers, tags
  EPISODES.forEach(({ characters, writers, tags }) => {
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

  // Sort results, showing only repeat writers
  fabricate.update({
    episodes: EPISODES,
    allCharacters: allCharacters.sort(sortByCount),
    allWriters: allWriters.filter(({ count }) => count > 1).sort(sortByCount),
    allTags: allTags.sort(sortByCount),
  });
};

/**
   * Generic matcher for selected lists against lists in Episode.
   *
   * @param {Episode} e - Episode to match.
   * @param {string} epKey - Key in episode that contains list to compare against.
   * @param {Searchable[]} stateList - List of selections from the state.
   * @returns {boolean} true if this Episode should match.
   */
const matchIfAny = (e: Episode, epKey: keyof Episode, stateList: Searchable[]) =>
  !stateList.length || stateList.every(p => (e[epKey] as Searchable).includes(p));

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

  const matchesCharacters = (e: Episode) => matchIfAny(e, 'characters', selectedCharacters);
  const matchesWriters = (e: Episode) => matchIfAny(e, 'writers', selectedWriters);
  const matchesTags = (e: Episode) => matchIfAny(e, 'tags', selectedTags);

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
    margin: fabricate.isNarrow() ? '0px' : '0px auto',
  })
  .setChildren([
    SiteTitle(),
    Separator({ backgroundColor: Theme.Colors.sunnyYellow })
      .setStyles({
        margin: 0,
        height: '8px',
        width: '100%',
      }),
    Subtitle()
      .setStyles({ textAlign: 'center' })
      .setText('Find an episode where characters meet, by a given writer, or with specific themes.'),
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
      .onUpdate((el, { results }) => el.setText(results.length > 0 ? `Found ${results.length} results:` : 'No results')),
    ResultsList(),
    Footer(),
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
