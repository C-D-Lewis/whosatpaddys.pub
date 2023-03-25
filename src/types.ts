/** Compiled episode */
export type Episode = {
  season: string;
  episode: string;
  title: string;
  characters: string[];
  writers: string[];
}

/** State of the fabricate.js app */
export type AppState = {
  episodes: Episode[],
  allCharacters: string[],
  allWriters: string[],
  results: Episode[],
  selectedCharacters: string[],
  selectedWriters: string[],
}

/********************************** Temporary fabricate.js types **********************************/

// TODO: Find way to use app-specific state type as onUpdate/when state param

/** Fabricate components extend HTML elements */
export interface FabricateComponent extends HTMLElement {
  setStyles: (styles: object) => FabricateComponent;
  setChildren: (children: FabricateComponent[]) => FabricateComponent;
  setText: (text: string) => FabricateComponent;

  onCreate: (cb: Function) => FabricateComponent;
  onUpdate: (cb: (el: FabricateComponent, state: any, keysChanged: string[]) => void, watchKeys?: string[]) => FabricateComponent;
  onHover: (cb: (el: FabricateComponent, state: any, isHovered: boolean) => void) => FabricateComponent;
  onClick: (cb: (el: FabricateComponent, state: any) => void) => FabricateComponent;

  when: (cb: (state: any) => boolean) => FabricateComponent;
}

/** Fabricate.js library */
export type Fabricate = {
  (componentName: string, props?: object): FabricateComponent;

  app: (root: FabricateComponent, initialState: any) => FabricateComponent;
  update: (param1: string | object, param2?: Function | object | undefined) => void;
  isNarrow: () => boolean;
}
