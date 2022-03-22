export const makeApiUrl = (key: string): string =>
  `https://houses-for-sale-sandbox-default-rtdb.europe-west1.firebasedatabase.app/${key}/.json`;

export default makeApiUrl;
