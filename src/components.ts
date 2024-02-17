import { Fabricate, FabricateComponent } from 'fabricate.js/types/fabricate';
// import Theme from './theme';
import {
  AppState, Character, Episode, Tag, Writer,
} from './types';
import Theme from './theme';

declare const fabricate: Fabricate<AppState>;

/**
 * CountableChip component.
 *
 * @param {object} props - Component props.
 * @param {string} props.name - Character name.
 * @param {number} [props.count] - Appearance count.
 * @param {boolean} [props.isControl] - If the isControl version.
 * @param {boolean} [props.showText] - If text should be shown.
 * @param {string} [props.imgSize] - Image size.
 * @param {string} props.imgSrc - Image src.
 * @returns {FabricateComponent} Fabricate component.
 */
const CountableChip = ({
  name,
  count,
  isControl = true,
  showText = true,
  imgSize = '18px',
  imgSrc,
}: {
  name: string;
  count?: number;
  isControl?: boolean;
  showText?: boolean;
  imgSize?: string;
  imgSrc: string;
}) => {
  const image = fabricate('Image', { src: imgSrc })
    .setStyles({
      width: imgSize,
      height: imgSize,
      borderRadius: '50px',
    });

  return fabricate('Row')
    .setStyles(({ palette }) => ({
      backgroundColor: palette.unselected,
      borderRadius: '50px',
      padding: '2px 3px',
      cursor: isControl ? 'pointer' : 'initial',
      margin: '2px',
      transition: '0.3s',
      alignItems: 'center',
    }))
    .onHover((el, state, isHovered) => {
      if (!isControl || fabricate.isNarrow()) return;

      el.setStyles({ filter: `brightness(${isHovered ? 0.7 : 1})` });
    })
    .setChildren([
      image,
      isControl || showText
        ? fabricate('span')
          .setStyles({
            fontSize: fabricate.isNarrow() ? '0.9rem' : '1rem',
            padding: '0px 2px',
          })
          .setText(count ? `${name} (${count})` : name)
        : fabricate('div'),
    ]);
};

/**
 * CharacterChip component.
 *
 * @param {object} props - Component props.
 * @param {string} props.name - Character name.
 * @param {number} [props.count] - Appearance count.
 * @param {boolean} [props.isControl] - If the isControl version.
 * @param {boolean} [props.showText] - If text should be shown.
 * @returns {FabricateComponent} Fabricate component.
 */
export const CharacterChip = ({
  name,
  count,
  isControl = true,
  showText = false,
}: {
  name: Character;
  count?: number;
  isControl?: boolean;
  showText?: boolean;
}) => CountableChip({
  name,
  count,
  isControl,
  showText,
  imgSize: fabricate.isNarrow() ? '24px' : '32px',
  imgSrc: `assets/characters/${name}.jpg`,
})
  .onClick((el, { selectedCharacters }) => {
    if (!isControl) return;

    const nowSelected = !selectedCharacters.includes(name);
    el.setStyles(({ palette }) => ({
      backgroundColor: nowSelected ? palette.sunnyYellow : palette.unselected,
    }));

    fabricate.update({
      selectedCharacters: nowSelected
        ? [...selectedCharacters, name]
        : selectedCharacters.filter((p: string) => p !== name),
    });
  })
  .onUpdate((el, { selectedCharacters }) => {
    // If matching the query, highlight
    if (isControl) return;

    const isSelected = selectedCharacters.includes(name);
    el.setStyles(({ palette }) => ({
      backgroundColor: isSelected ? palette.sunnyYellow : palette.unselected,
    }));
  }, ['fabricate:created']);

/**
 * WriterChip component.
 *
 * @param {object} props - Component props.
 * @param {string} props.name - Writer name.
 * @param {number} [props.count] - Appearance count.
 * @param {boolean} [props.isControl] - If the isControl version.
 * @returns {FabricateComponent} Fabricate component.
 */
const WriterChip = ({
  name,
  count,
  isControl = true,
}: {
  name: Writer;
  count?: number;
  isControl?: boolean;
}) => CountableChip({
  name,
  count,
  isControl,
  imgSrc: 'assets/icons/pen.png',
})
  .onClick((el, { selectedWriters }) => {
    if (!isControl) return;

    const isSelected = !selectedWriters.includes(name);
    el.setStyles(({ palette }) => ({
      backgroundColor: isSelected ? palette.sunnyYellow : palette.unselected,
    }));

    fabricate.update({
      selectedWriters: isSelected
        ? [...selectedWriters, name]
        : selectedWriters.filter((p: string) => p !== name),
    });
  })
  .onUpdate((el, { selectedWriters }) => {
    // If matching the query, highlight
    if (isControl) return;

    const isSelected = selectedWriters.includes(name);
    el.setStyles(({ palette }) => ({
      backgroundColor: isSelected ? palette.sunnyYellow : palette.unselected,
    }));
  }, ['fabricate:created']);

/**
 * TagChip component.
 *
 * @param {object} props - Component props.
 * @param {string} props.name - Tag name.
 * @param {number} [props.count] - Appearance count.
 * @param {boolean} [props.isControl] - If the isControl version.
 * @returns {FabricateComponent} Fabricate component.
 */
const TagChip = ({
  name,
  count,
  isControl = true,
}: {
  name: Tag;
  count?: number;
  isControl?: boolean;
}) => CountableChip({
  name,
  count,
  isControl,
  imgSrc: 'assets/icons/tag.png',
})
  .onClick((el, { selectedTags }) => {
    if (!isControl) return;

    const isSelected = !selectedTags.includes(name);
    el.setStyles(({ palette }) => ({
      backgroundColor: isSelected ? palette.sunnyYellow : palette.unselected,
    }));

    fabricate.update({
      selectedTags: isSelected
        ? [...selectedTags, name]
        : selectedTags.filter((p: string) => p !== name),
    });
  })
  .onUpdate((el, { selectedTags }) => {
    // If matching the query, highlight
    if (isControl) return;

    const isSelected = selectedTags.includes(name);
    el.setStyles(({ palette }) => ({
      backgroundColor: isSelected ? palette.sunnyYellow : palette.unselected,
    }));
  }, ['fabricate:created']);

/**
 * ResultText component.
 *
 * @returns {FabricateComponent} Fabricate component.
 */
const ResultText = () => fabricate('Text')
  .setStyles({
    fontFamily: 'Textile',
    color: 'white',
    margin: '10px',
    fontSize: fabricate.isNarrow() ? '1.2rem' : '1.4rem',
    textAlign: 'center',
  });

/**
 * ResultCard component.
 *
 * @param {object} props - Component props.
 * @param {Episode} props.episode - Episode data.
 * @returns {FabricateComponent} Fabricate component.
 */
const ResultCard = ({
  episode,
}: {
  episode: Episode;
}) => {
  const rowStyles = {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '3px 10px',
  };

  return fabricate('Fader')
    .setStyles({
      width: fabricate.isNarrow() ? '95%' : '45%',
      margin: '5px auto 25px auto',
      minHeight: '200px',
      maxHeight: '300px',
    })
    .setChildren([
      fabricate('Column')
        .setStyles({
          border: 'solid 2px white',
          borderRadius: '5px',
          height: '100%',
          backgroundColor: 'black',
        })
        .setChildren([
          fabricate('Row')
            .setStyles({ ...rowStyles, flex: '1' })
            .setChildren([
              ResultText().setText(episode.title),
            ]),
          fabricate('Row')
            .setStyles(rowStyles)
            .setChildren([
              ResultText().setText(`(S${episode.season} Ep ${episode.episode})`),
            ]),
          fabricate('Row')
            .setStyles({ ...rowStyles, backgroundColor: '#111' })
            .setChildren([
              ...episode.characters.map(
                (name) => CharacterChip({ name, isControl: false, showText: false }),
              ),
            ]),
          fabricate('Row')
            .setStyles({ ...rowStyles, backgroundColor: '#111' })
            .setChildren([
              ...episode.writers.map((name) => WriterChip({ name, isControl: false })),
              ...episode.tags.map((name) => TagChip({ name, isControl: false })),
            ]),
        ]),
    ]);
};

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
    margin: '0px auto',
    padding: '70px 0px 5px 0px',
    fontFamily: 'Textile',
    backgroundImage: 'url(assets/images/bar.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
    width: '100%',
    textAlign: 'center',
    cursor: 'default',
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
  type,
}: {
  type: 'characters' | 'writers' | 'tags';
}) => fabricate('Row')
  .setStyles({
    flexWrap: 'wrap',
    padding: '10px',
    backgroundColor: '#222A',
    borderRadius: '5px',
    overflowY: fabricate.isNarrow() ? 'scroll' : 'none',
    maxHeight: fabricate.isNarrow() ? '100px' : 'initial',
  })
  .onUpdate((el, { allCharacters, allWriters, allTags }) => {
    if (type === 'characters') {
      el.setChildren(allCharacters.map(({ name }) => CharacterChip({ name: name as Character })));
      return;
    }

    if (type === 'writers') {
      el.setChildren(allWriters.map(({ name }) => WriterChip({ name: name as Writer })));
      return;
    }

    el.setChildren(allTags.map(({ name }) => TagChip({ name: name as Tag })));
  }, ['allCharacters', 'allWriters', 'allTags']);

/**
 * ResultsList component.
 *
 * @returns {FabricateComponent} Fabricate component.
 */
export const ResultsList = () => fabricate('Row')
  .setStyles({
    flexWrap: 'wrap',
    minHeight: '60vh',
  })
  .onUpdate((el, { results }) => {
    el.setChildren(results.map((episode: Episode) => ResultCard({ episode })));
  }, ['results']);

/**
 * Separator component.
 *
 * @param {object} props - Component props.
 * @param {string} props.backgroundColor - Background color.
 * @returns {FabricateComponent} Fabricate component.
 */
export const Separator = ({ backgroundColor = Theme.palette.paddysGreen }: { backgroundColor?: string } = {}) => fabricate('div')
  .setStyles({
    backgroundColor,
    height: '3px',
    width: '50%',
    margin: '20px auto 0px auto',
  });

/**
 * Footer component.
 *
 * @returns {FabricateComponent} Fabricate component.
 */
export const Footer = () => fabricate('Column')
  .setStyles({
    width: '100%',
    padding: '15px 0px',
    backgroundColor: '#111',
  })
  .setChildren([
    fabricate('Text')
      .setStyles({ color: 'white', textAlign: 'center' })
      .setText('Something missing? Contributions/issues welcome on GitHub!'),
    fabricate('Row')
      .setStyles({ justifyContent: 'center', padding: '5px' })
      .setChildren([
        fabricate('img')
          .setAttributes({ src: './assets/images/github.png' })
          .setStyles({
            width: '32px',
            height: '32px',
            cursor: 'pointer',
          })
          .onClick(() => window.open('https://github.com/C-D-Lewis/whosatpaddys.pub', '_blank')),
        fabricate('FabricateAttribution')
          .setStyles({ marginLeft: '15px', width: '50px' }),
      ]),
  ]);
