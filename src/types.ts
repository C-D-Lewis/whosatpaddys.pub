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

/** Fabricate components extend HTML elements */
export interface FabricateComponent<T> extends HTMLElement {
  setStyles: (styles: object) => FabricateComponent<T>;
  setChildren: (children: FabricateComponent<T>[]) => FabricateComponent<T>;
  setText: (text: string) => FabricateComponent<T>;

  onCreate: (cb: (el: FabricateComponent<T>, state: T) => void) => FabricateComponent<T>;
  onUpdate: (cb: (el: FabricateComponent<T>, state: T, keysChanged: string[]) => void, watchKeys?: string[]) => FabricateComponent<T>;
  onHover: (cb: (el: FabricateComponent<T>, state: T, isHovered: boolean) => void) => FabricateComponent<T>;
  onClick: (cb: (el: FabricateComponent<T>, state: T) => void) => FabricateComponent<T>;

  when: (cb: (state: T) => boolean) => FabricateComponent<T>;
}

/** Fabricate.js library */
export type Fabricate<T> = {
  (componentName: string, props?: object): FabricateComponent<T>;

  app: (root: FabricateComponent<T>, initialState: T) => FabricateComponent<T>;
  update: (param1: string | object, param2?: Function | object | undefined) => void;
  isNarrow: () => boolean;
}
