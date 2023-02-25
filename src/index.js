/**
 * Fetch the episode data file.
 *
 * @returns {Promise<Array<object>>} Episodes data.
 */
const fetchEpisodeData = () => fetch('assets/episodes.json')
  .then((r) => r.json());

/**
 * Update results because selections changed.
 *
 * @param {object} state - App state.
 */
const updateResults = (state) => {
  const { selectedCharacters, episodes } = state;
  if (!selectedCharacters.length) {
    fabricate.update({ results: [] });
    return;
  }

  const results = episodes.filter((e) => selectedCharacters.every((c) => e.characters.includes(c)));
  fabricate.update({ results });
};

/**
 * App component.
 *
 * @returns {HTMLElement} Fabricate component.
 */
const App = () => fabricate('Column')
  .setChildren([
    fabricate('SiteTitle'),
    fabricate('ChipRow'),
    fabricate('ResultsList'),
  ])
  .onUpdate((el, state, updatedKeys) => {
    if (updatedKeys.includes('selectedCharacters')) updateResults(state);
  });

const initialState = {
  episodes: [],
  results: [],
  selectedCharacters: [],
};
fabricate.app(App(), initialState);

fetchEpisodeData()
  .then((episodes) => fabricate.update({ episodes }));
