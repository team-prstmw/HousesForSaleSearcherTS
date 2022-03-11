export const makeRequest = async (url, options = { method: 'GET' }) => {
  const response = await fetch(url, options);
  return response;
};

export default makeRequest;
