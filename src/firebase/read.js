import { makeApiUrl } from './utils/makeApiUrl';
import { objectToArray } from './utils/objectToArray';

export const readAll = (key) => {
  const apiUrl = makeApiUrl(key);

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => objectToArray(data, 'key'));
};

export default readAll;
