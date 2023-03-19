/**
 * Fetch the episode data file.
 *
 * @returns {Promise<Array<object>>} Episodes data.
 */
const fetchData = async () => {
  const episodes = await fetch('assets/episodes.json').then((r) => r.json());
  fabricate.update({ episodes });
};

/**
 * Update results because selections changed.
 *
 * @param {object} state - App state.
 */
const updateResults = (state) => {
  const { selectedCharacters, selectedWriters, episodes } = state;
  if (!selectedCharacters.length && !selectedWriters.length) {
    fabricate.update({ results: [] });
    return;
  }

  const results = episodes.filter(
    (e) => selectedCharacters.every((c) => e.characters.includes(c)
      && selectedWriters.every((w) => e.writers.includes(w))),
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
    fabricate('SiteTitle'),
    fabricate('Subtitle').setText('With characters:'),
    fabricate('ChipRow', { type: 'characters' }),
    fabricate('Subtitle').setText('By writers:'),
    fabricate('ChipRow', { type: 'writers' }),
    fabricate('Subtitle')
      .setStyles({ textAlign: 'center' })
      .onUpdate((el, { results }) => el.setText(`Found ${results.length} results:`))
      .when((state) => state.results && state.results.length),
    fabricate('ResultsList'),
  ])
  .onUpdate((el, state) => {
    updateResults(state);
  }, ['selectedCharacters', 'selectedWriters']);

const initialState = {
  episodes: [],
  results: [],
  selectedCharacters: [],
  selectedWriters: [],
};
fabricate.app(App(), initialState);

fetchData();
