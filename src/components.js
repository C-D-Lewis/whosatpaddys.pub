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
const CharacterChip = ({ name, interactive = true }) => {
  const imgSize = fabricate.isNarrow() ? '24px' : '32px';

  const characterImage = fabricate('Image', { src: `assets/characters/${name}.jpg` })
    .setStyles({
      width: imgSize,
      height: imgSize,
      borderRadius: '50px',
    });

  return fabricate('Row')
    .setStyles({
      backgroundColor: interactive ? Theme.Colors.unselected : Theme.Colors.paddysGreen,
      borderRadius: '50px',
      padding: '2px 3px',
      cursor: interactive ? 'pointer' : 'initial',
      margin: '2px',
      transition: '0.3s',
      alignItems: 'center',
    })
    .onHover((el, state, isHovered) => {
      if (!interactive) return;

      el.setStyles({ filter: `brightness(${isHovered ? 0.7 : 1})` });
    })
    .onClick((el, { selectedCharacters }) => {
      if (!interactive) return;

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
      characterImage,
      interactive
        ? fabricate('Text')
          .setStyles({ fontSize: fabricate.isNarrow() ? '0.9rem' : '1rem' })
          .setText(name)
        : fabricate('div'),
    ]);
};

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
    padding: '2px 3px',
    cursor: interactive ? 'pointer' : 'default',
    margin: '2px',
    transition: '0.3s',
    alignItems: 'center',
    height: '20px',
  })
  .onHover((el, state, isHovered) => {
    if (!interactive) return;

    el.setStyles({ filter: `brightness(${isHovered ? 0.7 : 1})` });
  })
  .onClick((el, { selectedWriters }) => {
    if (!interactive) return;

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
      .setStyles({ width: '18px', height: '18px' }),
    fabricate('Text')
      .setStyles({ fontSize: fabricate.isNarrow() ? '0.9rem' : '1rem' })
      .setText(name),
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
    margin: '0px 15px 0px 5px',
    minWidth: '50px',
  });

/**
 * ResultItem component.
 *
 * @param {object} props - Component props.
 * @param {object} props.episode - Episode data.
 * @returns {HTMLElement} Fabricate component.
 */
const ResultItem = ({ episode }) => fabricate('Fader')
  .setChildren([
    fabricate('Column')
      .setStyles({
        border: 'solid 2px white',
        borderRadius: '5px',
        margin: '5px 0px',
        padding: '5px',
      })
      .setChildren([
        fabricate('Row')
          .setStyles({
            alignItems: 'center',
            flexWrap: 'wrap',
          })
          .setChildren([
            ResultRowText().setText(`S${episode.season} Ep ${episode.episode}`),
            ResultRowText().setText(episode.title),
          ]),
        fabricate('Row')
          .setStyles({
            flexWrap: 'wrap',
            alignItems: 'center',
          })
          .setChildren([
            ...episode.characters.map((name) => CharacterChip({ name, interactive: false })),
            ...episode.writers.map((name) => WriterChip({ name, interactive: false })),
          ]),
      ]),
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
      fontSize: fabricate.isNarrow() ? '2rem' : '3rem',
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
      el.setChildren(results.map((episode) => ResultItem({ episode })));
    }, ['results']),
);
