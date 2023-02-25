/** List of recurring characters (sync with script) */
const CHARACTERS = [
  'Dennis',
  'Mac',
  'Charlie',
  'Dee',
  'Frank',
  'The Waitress',
  'Artemis',
  'McPoyles',
  'Bill',
  'Maureen',
  'Gail the Snail',
  'The Lawyer',
  'Uncle Jack',
  'Mac\'s Mom',
  'Charlie\'s Mom',
  'Barbara',
  'Luther',
  'The Maniac',
  'Z',
  'Carmen',
  'Hwang',
  'Cricket',
];

/**
 * Chip component.
 *
 * @param {object} props - Component props.
 * @param {string} props.name - Character name.
 * @returns {HTMLElement} Fabricate component.
 */
const CharacterChip = ({ name }) => fabricate('Row')
  .setStyles({
    backgroundColor: Theme.Colors.unselected,
    borderRadius: '50px',
    padding: '4px 5px',
    cursor: 'pointer',
    margin: '3px',
    transition: '0.3s',
  })
  .onHover((el, state, isHovered) => {
    el.setStyles({ filter: `brightness(${isHovered ? 0.7 : 1})` });
  })
  .onClick((el, { selectedCharacters }) => {
    // Toggle
    const isSelected = !selectedCharacters.includes(name);

    fabricate.update({
      selectedCharacters: isSelected
        ? [...selectedCharacters, name]
        : selectedCharacters.filter((p) => p !== name),
    });

    el.setStyles({
      backgroundColor: isSelected ? Theme.Colors.sunnyYellow : Theme.Colors.unselected,
    });
  })
  .setChildren([
    fabricate('Image', { src: `assets/characters/${name}.jpg` })
      .setStyles({
        width: '32px',
        height: '32px',
        borderRadius: '50px',
      }),
    fabricate('Text').setText(name),
  ]);

/**
 * TableCellText component.
 *
 * @param {object} props - Component props.
 * @param {boolean} [props.isHeader] - If this text is in the table header.
 * @returns {HTMLElement} Fabricate component.
 */
const TableCellText = ({ isHeader = false } = {}) => fabricate('Text')
  .setStyles({
    fontFamily: 'Textile',
    color: 'white',
    fontWeight: isHeader ? 'bold' : 'initial',
  });

/**
 * ResultRow component.
 *
 * @param {object} props - Component props.
 * @param {object} props.episode - Episode data.
 * @returns {HTMLElement} Fabricate component.
 */
const ResultRow = ({ episode }) => fabricate('Row')
  .setStyles({

  })
  .setChildren([
    TableCellText().setText(`S${episode.season} Ep ${episode.episode}`),
    TableCellText().setText(episode.title),
  ]);

/**
 * SiteTitle component.
 *
 * @returns {HTMLElement} Fabricate component.
 */
fabricate.declare(
  'SiteTitle',
  () => fabricate('Text')
    .setStyles({
      color: 'white',
      fontSize: '3rem',
      margin: 'auto',
      fontFamily: 'Textile',
    })
    .setText('Who\'s at Paddy\'s?'),
);

/**
 * ChipRow component.
 *
 * @returns {HTMLElement} Fabricate component.
 */
fabricate.declare(
  'ChipRow',
  () => fabricate('Row')
    .setStyles({
      flexWrap: 'wrap',
    })
    .setChildren(CHARACTERS.map((name) => CharacterChip({ name }))),
);

/**
 * ResultsList component.
 *
 * @returns {HTMLElement} Fabricate component.
 */
fabricate.declare(
  'ResultsList',
  () => fabricate('Column')
    .onUpdate((el, { results }) => {
      el.setChildren(results.map((episode) => ResultRow({ episode })));
    }, ['results']),
);
