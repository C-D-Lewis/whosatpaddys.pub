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
  'Mrs Mac',
  'Mrs Kelly',
  'Barbara',
  'Luther',
  'The Maniac',
  'Z',
  'Carmen',
  'Hwang',
  'Cricket',
  'Bruce',
  'Ingrid',
  'Lil\' Kev',
];

/** List of writers */
const WRITERS = [
  'Day',
  'McElhenney',
  'Howerton',
  'Romano',
  'Falconer',
  'Hornsby',
  'Marder',
  'Rosell',
];

/**
 * CharacterChip component.
 *
 * @param {object} props - Component props.
 * @param {string} props.name - Character name.
 * @param {boolean} [props.interactive] - If the interactive version.
 * @returns {HTMLElement} Fabricate component.
 */
const CharacterChip = ({ name, interactive = true }) => fabricate('Row')
  .setStyles({
    backgroundColor: interactive ? Theme.Colors.unselected : Theme.Colors.paddysGreen,
    borderRadius: '50px',
    padding: '4px 5px',
    cursor: interactive ? 'pointer' : 'initial',
    margin: '3px',
    transition: '0.3s',
  })
  .onHover((el, state, isHovered) => {
    if (!interactive) return;

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
    interactive ? fabricate('Text').setText(name) : fabricate('div'),
  ]);

/**
 * WriterChip component.
 *
 * @param {object} props - Component props.
 * @param {string} props.name - Character name.
 * @param {boolean} [props.interactive] - If the interactive version.
 * @returns {HTMLElement} Fabricate component.
 */
const WriterChip = ({ name, interactive = true }) => fabricate('Row')
  .setStyles({
    backgroundColor: interactive ? Theme.Colors.unselected : Theme.Colors.paddysGreen,
    borderRadius: '50px',
    padding: '1px 3px',
    cursor: interactive ? 'pointer' : 'default',
    margin: '3px',
    transition: '0.3s',
    alignItems: 'center',
  })
  .onHover((el, state, isHovered) => {
    if (!interactive) return;

    el.setStyles({ filter: `brightness(${isHovered ? 0.7 : 1})` });
  })
  .onClick((el, { selectedWriters }) => {
    // Toggle
    const isSelected = !selectedWriters.includes(name);

    fabricate.update({
      selectedWriters: isSelected
        ? [...selectedWriters, name]
        : selectedWriters.filter((p) => p !== name),
    });

    el.setStyles({
      backgroundColor: isSelected ? Theme.Colors.sunnyYellow : Theme.Colors.unselected,
    });
  })
  .setChildren([
    fabricate('Image', { src: 'assets/pen.png' })
      .setStyles({
        width: '24px',
        height: '24px',
      }),
    fabricate('Text').setText(name),
  ]);

/**
 * ResultRowText component.
 *
 * @param {object} props - Component props.
 * @param {boolean} [props.isHeader] - If this text is in the table header.
 * @returns {HTMLElement} Fabricate component.
 */
const ResultRowText = ({ isHeader = false } = {}) => fabricate('Text')
  .setStyles({
    fontFamily: 'Textile',
    color: 'white',
    fontWeight: isHeader ? 'bold' : 'initial',
    margin: '0px 20px 0px 10px',
    minWidth: '100px',
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
    border: 'solid 2px white',
    borderRadius: '5px',
    margin: '5px',
    height: '64px',
    alignItems: 'center',
  })
  .setChildren([
    ResultRowText().setText(`S${episode.season} Ep ${episode.episode}`),
    ResultRowText().setText(episode.title),
    ...episode.characters.map((name) => CharacterChip({ name, interactive: false })),
    ...episode.writers.map((name) => WriterChip({ name, interactive: false })),
  ]);

/**
 * Subtitle component.
 *
 * @returns {HTMLElement} Fabricate component.
 */
fabricate.declare(
  'Subtitle',
  () => fabricate('Text')
    .setStyles({
      color: 'white',
      fontSize: '1.1rem',
      fontFamily: 'Textile',
      marginTop: '25px',
    }),
);

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
  ({ type }) => {
    const children = type === 'characters'
      ? CHARACTERS.map((name) => CharacterChip({ name }))
      : WRITERS.map((name) => WriterChip({ name }));
    return fabricate('Row')
      .setStyles({ flexWrap: 'wrap' })
      .setChildren(children);
  },
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
