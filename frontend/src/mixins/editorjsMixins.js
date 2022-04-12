import { isObject } from "lodash";

const parseBlocksMixin = {
  methods: {
    parse(body, time) {
      let bodyAsJson;
      try {
        bodyAsJson = JSON.parse(body);
      } catch (e) {
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
    },
  },
};
export { parseBlocksMixin };
