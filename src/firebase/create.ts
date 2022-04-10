import { makeApiUrl } from './utils/makeApiUrl';

export const create = (key: string, dataToSave: Promise<string>) => {
  const apiUrl = makeApiUrl(key);

  return fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(dataToSave),
  }).then((response) => response.json());
};

export default create;
