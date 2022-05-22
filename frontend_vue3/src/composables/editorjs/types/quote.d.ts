// Type definitions for @editorjs/quote
// Project: https://github.com/editor-js/quote#readme (Does not have to be to GitHub, but prefer linking to a source code repository rather than to a project website.)
// Definitions by: Enes Çağlıyan <https://github.com/enescagl>

declare module "@editorjs/quote" {
  export default Quote;
}

interface QuoteData {
  text: string;
  caption: string;
  alignment: "center" | "left";
}

interface QuoteConfig {
  quotePlaceholder: string;
  captionPlaceholder: string;
  defaultAlignment: "center" | "left";
}

declare class Quote {
  constructor({
    data,
    config,
    api,
    readOnly,
  }: {
    data: QuoteData;
    config: QuoteConfig;
    api: object;
    readOnly: boolean;
  });

  static get isReadOnlySupported(): boolean;

  static get toolbox(): { icon: string; title: string };

  static get contentless(): boolean;

  static get enableLineBreaks(): boolean;

  static get DEFAULT_QUOTE_PLACEHOLDER(): string;

  static get DEFAULT_CAPTION_PLACEHOLDER(): string;

  static get ALIGNMENTS(): { left: string; center: string };

  static get DEFAULT_ALIGNMENT(): string;

  static get conversionConfig(): {
    import: string;
    export: (QuoteData) => string;
  };

  get CSS(): {
    baseClass: string;
    wrapper: string;
    quote: string;
    input: string;
    caption: string;
    settingsButton: string;
    settingsButtonActive: string;
  };

  get settings(): { name: string; icon: string }[];

  render(): Element;

  save(quoteElement: HTMLDivElement): QuoteData;

  static get sanitize(): {
    text: { br: boolean };
    caption: { br: boolean };
    alignment: object;
  };

  renderSettings(): HTMLDivElement;

  _make(
    tagName: string,
    classNames?: Array | string = null,
    attributes = {}
  ): Element;
}
