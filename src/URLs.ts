const key: string | boolean | undefined = import.meta.env.VITE_FIREBASE_APP_KEY;

export const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;

export const SIGN_UP_URL = `https://pacific-refuge-80597.herokuapp.com/api/users`;
export const RESET_PASSWORD = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${key}`;
