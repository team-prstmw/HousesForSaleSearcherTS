import LoginFormFields from 'src/schemas/loginRegisterFormSchemas';
import { SIGN_IN_URL } from 'src/URLs';

export async function signIn(
  requestData: LoginFormFields,
  manageRequestMessage: (errorMessage: string) => string,
  loginFunction: () => void
) {
  await fetch(SIGN_IN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data: { id: string; token: string; status: string; message: string }) => {
      localStorage.setItem('userId', data.id);
      const { token } = data;
      localStorage.setItem('token', token);
      document.cookie = `auth=${token}`;
      if (data.status === 'invalid') return manageRequestMessage(data.message);
      return loginFunction();
    })
    .catch((error) => {
      // ERROR IS NEVER RETURNED, DO WE HAVE TO REWRITE BACKEND
      return manageRequestMessage(data.message);
    });
}
