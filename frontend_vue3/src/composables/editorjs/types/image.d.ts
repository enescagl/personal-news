// Type definitions for @editorjs/image
// Project: https://github.com/editor-js/image#readme (Does not have to be to GitHub, but prefer linking to a source code repository rather than to a project website.)
// Definitions by: Enes Çağlıyan <https://github.com/enescagl>

declare module "@editorjs/image" {
  export default Image;
}

interface ImageToolData {
  caption: string;
  withBorder: boolean;
  withBackground: boolean;
  stretched: boolean;
  file: {
    url: string;
  };
}

interface ImageConfig {
  endpoints: {
    byFile: string;
    byUrl: string;
  };
  field: string;
  types: string;
  captionPlaceholder: string;
  additionalRequestData: object;
  additionalRequestHeaders: object;
  buttonContent: string;
  uploader: {
    uploadByFile: (
      file: File
    ) => Promise<{ success: number; file: { url: string } }>;
    uploadByUrl: (
      url: string
    ) => Promise<{ success: number; file: { url: string } }>;
  };
}

declare class Image {
  static get isReadOnlySupported(): boolean;

  static get toolbox(): { icon: string; title: string };

  constructor({
    data,
    config,
    api,
    readOnly,
  }: {
    data: ImageToolData;
    config: ImageConfig;
    api: object;
    readOnly: boolean;
  });

  render(): HTMLDivElement;

  validate(savedData: ImageToolData): boolean;

  save(): ImageToolData;

  renderSettings(): Element;

  appendCallback();

  static get pasteConfig(): {
    tags: string[];
    patterns: { [key: string]: RegExp };
    files: { extensions: string[]; mimeTypes: string[] };
  };

  async onPaste(event: CustomEvent);

  setTune(tuneName: string, value: boolean);

  uploadFile(file: File);

  uploadUrl(url: string);
}
