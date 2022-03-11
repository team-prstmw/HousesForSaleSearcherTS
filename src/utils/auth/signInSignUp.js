import makeRequest from '/src/utils/services/makeRequest';

export const signInSignUp = async (
  email,
  password,
  signURL,
  changeState,
  isLoggedIn,
  loginFunction,
  logoutFunction
) => {
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
