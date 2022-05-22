import { isObject } from "lodash";

type BaseType = Partial<{ [key: string]: any }>;

function deserializeObject(obj: BaseType, uniqueField = "id") {
  const deserializedData: BaseType = {};

  for (const key in obj) {
    let value: BaseType | any = obj[key];
    if (isObject(value) && uniqueField in value) {
      value = (<BaseType>value)[uniqueField];
    }
    deserializedData[key] = value;
  }

  return deserializedData;
}

export { deserializeObject };
