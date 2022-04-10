export const objectToArray = (object: { key: string; value: string | string[] }, keyPropertyName = 'id') => {
  return Object.entries(object || {}).map((entry) => {
    const key = entry[0];
    const value = entry[1];

    if (typeof value === 'object') {
      value[keyPropertyName] = key;
      return value;
    }

    return {
      [keyPropertyName]: key,
      value,
    };
  });
};

export default objectToArray;
