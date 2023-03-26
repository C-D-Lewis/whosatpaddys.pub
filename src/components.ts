import { Theme } from './theme';
import { Episode, Fabricate, FabricateComponent } from './types';

declare const fabricate: Fabricate;

/**
 * CharacterChip component.
 *
 * @param {object} props - Component props.
 * @param {string} props.name - Character name.
 * @param {boolean} [props.isControl] - If the isControl version.
 * @returns {FabricateComponent} Fabricate component.
 */
export const CharacterChip = ({
  name,
  isControl = true
}: {
  name: string;
  isControl?: boolean;
}) => {
  const imgSize = fabricate.isNarrow() ? '24px' : '32px';

  const characterImage = fabricate('Image', { src: `assets/characters/${name}.jpg` })
    .setStyles({
      width: imgSize,
      height: imgSize,
      borderRadius: '50px',
    });

  return fabricate('Row')
    .setStyles({
      backgroundColor: Theme.Colors.unselected,
      borderRadius: '50px',
      padding: '2px 3px',
      cursor: isControl ? 'pointer' : 'initial',
      margin: '2px',
      transition: '0.3s',
      alignItems: 'center',
    })
    .onHover((el, state, isHovered) => {
      if (!isControl) return;

      el.setStyles({ filter: `brightness(${isHovered ? 0.7 : 1})` });
    })
    .onClick((el, { selectedCharacters }) => {
      if (!isControl) return;

      const nowSelected = !selectedCharacters.includes(name);
      el.setStyles({ backgroundColor: nowSelected ? Theme.Colors.sunnyYellow : Theme.Colors.unselected });

      fabricate.update({
        selectedCharacters: nowSelected
          ? [...selectedCharacters, name]
          : selectedCharacters.filter((p: string) => p !== name),
      });
    })
    .onCreate((el, { selectedCharacters }) => {
      // If matching the query, highlight
      if (isControl) return;

      const isSelected = selectedCharacters.includes(name);
      el.setStyles({ backgroundColor: isSelected ? Theme.Colors.sunnyYellow : Theme.Colors.unselected });
    })
    .setChildren([
      characterImage,
      isControl
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
 * @param {string} props.name - Writer name.
 * @param {boolean} [props.isControl] - If the isControl version.
 * @returns {FabricateComponent} Fabricate component.
 */
const WriterChip = ({
  name,
  isControl = true,
}: {
  name: string;
  isControl?: boolean;
}) => fabricate('Row')
  .setStyles({
    backgroundColor: Theme.Colors.unselected,
    borderRadius: '50px',
    padding: '4px 6px',
    cursor: isControl ? 'pointer' : 'default',
    margin: '2px',
    transition: '0.3s',
    alignItems: 'center',
    height: '20px',
  })
  .onHover((el, state, isHovered) => {
    if (!isControl) return;

    el.setStyles({ filter: `brightness(${isHovered ? 0.7 : 1})` });
  })
  .onClick((el, { selectedWriters }) => {
    if (!isControl) return;

    const isSelected = !selectedWriters.includes(name);
    el.setStyles({ backgroundColor: isSelected ? Theme.Colors.sunnyYellow : Theme.Colors.unselected });

    fabricate.update({
      selectedWriters: isSelected
        ? [...selectedWriters, name]
        : selectedWriters.filter((p: string) => p !== name),
    });
  })
  .onCreate((el, { selectedWriters }) => {
    // If matching the query, highlight
    if (isControl) return;

    const isSelected = selectedWriters.includes(name);
    el.setStyles({ backgroundColor: isSelected ? Theme.Colors.sunnyYellow : Theme.Colors.unselected });
  })
  .setChildren([
    fabricate('Image', { src: 'assets/icons/pen.png' })
      .setStyles({ width: '18px', height: '18px' }),
    fabricate('Text')
      .setStyles({ fontSize: fabricate.isNarrow() ? '0.9rem' : '1rem' })
      .setText(name),
  ]);

/**
 * TagChip component.
 *
 * @param {object} props - Component props.
 * @param {string} props.name - Tag name.
 * @param {boolean} [props.isControl] - If the isControl version.
 * @returns {FabricateComponent} Fabricate component.
 */
const TagChip = ({
  name,
  isControl = true,
}: {
  name: string;
  isControl?: boolean;
}) => fabricate('Row')
  .setStyles({
    backgroundColor: Theme.Colors.unselected,
    borderRadius: '50px',
    padding: '4px 6px',
    cursor: isControl ? 'pointer' : 'default',
    margin: '2px',
    transition: '0.3s',
    alignItems: 'center',
    height: '20px',
  })
  .onHover((el, state, isHovered) => {
    if (!isControl) return;

    el.setStyles({ filter: `brightness(${isHovered ? 0.7 : 1})` });
  })
  .onClick((el, { selectedTags }) => {
    if (!isControl) return;

    const isSelected = !selectedTags.includes(name);
    el.setStyles({ backgroundColor: isSelected ? Theme.Colors.sunnyYellow : Theme.Colors.unselected });

    fabricate.update({
      selectedTags: isSelected
        ? [...selectedTags, name]
        : selectedTags.filter((p: string) => p !== name),
    });
  })
  .onCreate((el, { selectedWriters }) => {
    // If matching the query, highlight
    if (isControl) return;

    const isSelected = selectedWriters.includes(name);
    el.setStyles({ backgroundColor: isSelected ? Theme.Colors.sunnyYellow : Theme.Colors.unselected });
  })
  .setChildren([
    fabricate('Image', { src: 'assets/icons/tag.png' })
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
 * @returns {FabricateComponent} Fabricate component.
 */
const ResultRowText = ({
  isHeader = false,
}: {
  isHeader?: boolean;
} = {}) => fabricate('Text')
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
 * @param {Episode} props.episode - Episode data.
 * @returns {FabricateComponent} Fabricate component.
 */
const ResultItem = ({
  episode,
}: {
  episode: Episode;
}) => fabricate('Fader')
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
          .setStyles({ alignItems: 'center', flexWrap: 'wrap' })
          .setChildren([
            ResultRowText().setText(`S${episode.season} Ep ${episode.episode}`),
            ResultRowText().setText(episode.title),
          ]),
        fabricate('Row')
          .setStyles({ flexWrap: 'wrap', alignItems: 'center' })
          .setChildren([
            ...episode.characters.map((name) => CharacterChip({ name, isControl: false })),
            ...episode.writers.map((name) => WriterChip({ name, isControl: false })),
            ...episode.tags.map((name) => TagChip({ name, isControl: false })),
          ]),
      ]),
  ]);

/**
 * Subtitle component.
 *
 * @returns {FabricateComponent} Fabricate component.
 */
export const Subtitle = () => fabricate('Text')
  .setStyles({
    color: 'white',
    fontSize: '1.1rem',
    fontFamily: 'Textile',
    marginTop: '15px',
  });

/**
 * SiteTitle component.
 *
 * @returns {FabricateComponent} Fabricate component.
 */
export const SiteTitle = () => fabricate('Text')
  .setStyles({
    color: 'white',
    fontSize: fabricate.isNarrow() ? '2rem' : '3rem',
    margin: 'auto',
    fontFamily: 'Textile',
  })
  .setText('Who\'s at Paddy\'s?');

/**
 * ChipRow component.
 *
 * @param {object} props - Component props.
 * @param {string} props.type - Chip type.
 * @returns {FabricateComponent} Fabricate component.
 */
export const ChipRow = ({
  type
}: {
  type: 'characters' | 'writers' | 'tags';
}) => fabricate('Row')
    .setStyles({ flexWrap: 'wrap' })
    .onUpdate((el, { allCharacters, allWriters, allTags }) => {
      if (type === 'characters') {
        el.setChildren(allCharacters.map((name: string) => CharacterChip({ name })));
        return;
      }

      if (type === 'writers') {
        el.setChildren(allWriters.map((name: string) => WriterChip({ name })));
        return;
      }
      
      el.setChildren(allTags.map((name: string) => TagChip({ name })));
    }, ['allCharacters', 'allWriters', 'allTags']);

/**
 * ResultsList component.
 *
 * @returns {FabricateComponent} Fabricate component.
 */
export const ResultsList = () => fabricate('Column')
  .onUpdate((el, { results }) => {
    el.setChildren(results.map((episode: Episode) => ResultItem({ episode })));
  }, ['results']);
