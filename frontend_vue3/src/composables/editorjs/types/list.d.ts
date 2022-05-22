// Type definitions for @editorjs/list
// Project: https://github.com/editor-js/list#readme (Does not have to be to GitHub, but prefer linking to a source code repository rather than to a project website.)
// Definitions by: Enes Çağlıyan <https://github.com/enescagl>

declare module "@editorjs/list" {
  export default List;
}

interface ListConfig {
  defaultStyle: string;
}

interface ListData {
  style: string;
  items: Array;
}

declare class List {
  static get isReadOnlySupported(): boolean;

  static get enableLineBreaks(): boolean;

  static get toolbox(): { icon: string; title: string };

  constructor(config?: {
    data: ListData;
    config: ListConfig;
    api: object;
    readOnly: boolean;
  });

  render(): Element;

  save(): ListData;

  static get conversionConfig(): {
    export: (ListData) => string;
    import: (string) => ListData;
  };

  static get sanitize(): object;

  renderSettings(): Element;

  onPaste(event: PasteEvent);

  static get pasteConfig(): { tags: Array };

  makeMainTag(style: string): HTMLOListElement | HTMLUListElement;

  toggleTune(style: "ordered" | "unordered");

  get CSS(): {
    baseBlock: string;
    wrapper: string;
    wrapperOrdered: string;
    wrapperUnordered: string;
    item: string;
    settingsWrapper: string;
    settingsButton: string;
    settingsButtonActive: string;
  };

  set data(listData: ListData);

  get data(): ListData;

  _make(
    tagName: string,
    classNames?: Array | string = null,
    attributes = {}
  ): Element;

  get currentItem(): Element;

  getOutofList(event: KeyboardEvent);

  backspace(event: KeyboardEvent);

  selectItem(event: KeyboardEvent);

  pasteHandler(
    element: HTMLUListElement | HTMLOListElement | HTMLLIElement
  ): ListData;
}
