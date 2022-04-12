import { RegisterFormFields } from 'src/schemas/loginRegisterFormSchemas';
import { SIGN_UP_URL } from 'src/URLs';

interface SignUpProps {
  requestData: RegisterFormFields;
  manageRequestMessage: (errorMessage: string) => string;
  loginFunction: () => void;
}

export async function signUp(requestData, manageRequestMessage, loginFunction) {
  await fetch(SIGN_UP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'invalid') return manageRequestMessage(data.message);
      return loginFunction();
    })
    .catch((error) => {
      // ERROR IS NEVER RETURNED, DO WE HAVE TO REWRITE BACKEND
      manageRequestMessage(data.message);
    });
}
