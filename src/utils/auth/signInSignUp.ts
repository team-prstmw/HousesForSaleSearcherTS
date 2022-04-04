import makeRequest from 'src/utils/services/makeRequest';

export const signInSignUp = async (
  email: string,
  password: string,
  signURL: string,
  changeState: () => void,
  _isLoggedIn: boolean,
  loginFunction: () => void,
  _logoutFunction: () => void
): Promise<any> => {
  const response = await makeRequest(signURL, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    changeState(data.error.message);
  }
  if (response.ok) {
    loginFunction();
  }

  return data;
};
