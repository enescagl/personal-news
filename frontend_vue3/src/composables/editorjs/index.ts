import { isObject } from "lodash";
import EditorJs from "@editorjs/editorjs";
import type { OutputData } from "@editorjs/editorjs";
import { useAllTools } from "@/composables/editorjs/editorConfig";
import type { ImageToolConfig } from "@/composables/editorjs/editorConfig";

export function useEditorJs({
  editorHolder = "editorjs",
  imageToolConfig = undefined,
  initialData = undefined,
  readOnly = false,
}: {
  editorHolder?: string | HTMLElement;
  imageToolConfig?: ImageToolConfig;
  initialData?: object;
  readOnly: boolean;
}) {
  const editorData = initialData ? initialData : {};
  const tools = imageToolConfig ? useAllTools(imageToolConfig) : {};
  const editor = new EditorJs({
    tools,
    readOnly,
    holder: editorHolder,
    data: editorData as OutputData,
  });
  console.log(editor);
  return { editor };
}

export function useEditorJsParser() {
  function parse(body: string, time: string) {
    let bodyAsJson;
    try {
      bodyAsJson = JSON.parse(body);
    } catch {
      bodyAsJson = body;
    }

    return isObject(bodyAsJson)
      ? bodyAsJson
      : {
          time: Date.parse(time),
          blocks: [
            {
              type: "paragraph",
              data: {
                text: bodyAsJson,
              },
            },
          ],
        };
  }

  return { parse };
}
