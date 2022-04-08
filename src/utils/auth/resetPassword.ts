import makeRequest from '../../api/makeRequest';

export const resetPassword = async (
  email: string,
  signURL: string,
  manageRequestMessage: (message: string) => string
) => {
  const response = await makeRequest(signURL, {
    method: 'POST',
    body: JSON.stringify({
      requestType: 'PASSWORD_RESET',
      email,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    manageRequestMessage('SUCCESS');
  } else {
    manageRequestMessage(data.error.message);
  }

  return data;
};
