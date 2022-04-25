import { SIGN_OUT_URL } from 'src/URLs';

export async function signOut(logoutFunction: () => void) {
  await fetch(SIGN_OUT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((response) => response.json())
    .then((data: { message: string }) => {
      if (data.message === 'Logged out') {
        document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.clear();
      }
      return logoutFunction();
    });
}
