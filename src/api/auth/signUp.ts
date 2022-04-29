import { RegisterFormFields } from 'src/schemas/loginRegisterFormSchemas';
import { SIGN_UP_URL } from 'src/URLs';

export async function signUp(
  requestData: RegisterFormFields,
  manageRequestMessage: (errorMessage: string) => string,
  loginFunction: () => void
) {
  await fetch(SIGN_UP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (data.status === 'invalid') return manageRequestMessage(data.message);
      return loginFunction();
    });
}
