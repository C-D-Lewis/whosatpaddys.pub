/** Compiled episode */
export type Episode = {
  season: string;
  episode: string;
  title: string;
  characters: string[];
  writers: string[];
  tags: string[];
}

/** State of the fabricate.js app */
export type AppState = {
  episodes: Episode[];
  allCharacters: string[];
  allWriters: string[];
  allTags: string[];
  results: Episode[];
  selectedCharacters: string[];
  selectedWriters: string[];
  selectedTags: string[];
}

/********************************** Temporary fabricate.js types **********************************/

// TODO: Find way to use app-specific state type as onUpdate/when state param

/**
 * Fabricate component extends HTMLElement - and uses shape of app's state.
 */
export interface FabricateComponent<StateShape> extends HTMLElement {
  setStyles: (styles: object) => FabricateComponent<StateShape>;
  setChildren: (children: FabricateComponent<StateShape>[]) => FabricateComponent<StateShape>;
  setText: (text: string) => FabricateComponent<StateShape>;

  onCreate: (
    cb: (
      el: FabricateComponent<StateShape>,
      state: StateShape,
    ) => void,
  ) => FabricateComponent<StateShape>;
  onUpdate: (
    cb: (
      el: FabricateComponent<StateShape>,
      state: StateShape,
      keysChanged: string[],
    ) => void,
    watchKeys?: string[],
  ) => FabricateComponent<StateShape>;
  onHover: (
    cb: (
      el: FabricateComponent<StateShape>,
      state: StateShape,
      isHovered: boolean,
    ) => void,
  ) => FabricateComponent<StateShape>;
  onClick: (
    cb: (
      el: FabricateComponent<StateShape>,
      state: StateShape,
    ) => void,
  ) => FabricateComponent<StateShape>;

  when: (
    cb: (state: StateShape) => boolean,
  ) => FabricateComponent<StateShape>;
}

/** Fabricate.js library */
export type Fabricate<StateShape> = {
  (componentName: string, props?: object): FabricateComponent<StateShape>;

  app: (
    root: FabricateComponent<StateShape>,
    initialState: StateShape,
  ) => FabricateComponent<StateShape>;
  update: (
    param1: string | object,
    param2?: Function | object | undefined,
  ) => void;
  isNarrow: () => boolean;
}
