const key: string | boolean | undefined = import.meta.env.VITE_FIREBASE_APP_KEY;

export const SIGN_IN_URL = `https://peaceful-tundra-28430.herokuapp.com/api/login`;
export const SIGN_OUT_URL = `https://peaceful-tundra-28430.herokuapp.com/api/logout`;

export const SIGN_UP_URL = `https://peaceful-tundra-28430.herokuapp.com/api/users`;
// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
export const RESET_PASSWORD = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${key}`;
