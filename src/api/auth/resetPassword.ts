/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import makeRequest from '../makeRequest';

export const resetPassword = async (
  email: string,
  signURL: string,
  manageRequestMessage: (message: string) => void
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
