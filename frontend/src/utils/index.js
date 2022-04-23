import { isObject } from "lodash";

function deserializeObject(obj, uniqueField = "id") {
  let deserializedData = {};

  for (const key in obj) {
    let value = obj[key];
    if (isObject(value) && uniqueField in value) {
      value = value.id;
    }
    deserializedData[key] = value;
  }

  return deserializedData;
}

export { deserializeObject };
