export const makeRequest = async (url: string, options = { method: 'GET' }) => {
  const response = await fetch(url, options);
  return response;
};

export default makeRequest;
