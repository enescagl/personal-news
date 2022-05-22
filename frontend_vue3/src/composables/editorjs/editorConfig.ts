import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Image from "@editorjs/image";

type UploadByFileFunction = (
  file: File
) => Promise<{ success: number; file: { url: string } }>;
type UploadByURLFunction = (
  url: string
) => Promise<{ success: number; file: { url: string } }>;

type UploaderConfig = {
  uploadByFile: UploadByFileFunction;
  uploadByUrl: UploadByURLFunction;
};

export type ImageToolConfig = { uploaderConfig: UploaderConfig };

export function useHeaderTool() {
  return {
    header: {
      class: Header,
      config: {
        placeholder: "Enter a header",
        levels: [2, 3, 4],
        defaultLevel: 2,
      },
    },
  };
}

export function useListTool() {
  return {
    list: {
      class: List,
    },
  };
}

export function useQuoteTool() {
  return {
    quote: {
      class: Quote,
      config: {
        quotePlaceholder: "Enter a quote",
      },
    },
  };
}

export function useImageTool(config: ImageToolConfig) {
  return {
    image: {
      class: Image,
      config: {
        uploader: config.uploaderConfig,
      },
    },
  };
}

export function useAllTools(imageToolConfig: ImageToolConfig) {
  return {
    ...useHeaderTool(),
    ...useListTool(),
    ...useQuoteTool(),
    ...useImageTool(imageToolConfig),
  };
}
