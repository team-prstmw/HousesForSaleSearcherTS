const makeRequest = async (url: string, options: RequestInit = { method: 'GET' }): Promise<unknown> => {
  const response = await fetch(url, options);
  return response;
};

export default makeRequest;
