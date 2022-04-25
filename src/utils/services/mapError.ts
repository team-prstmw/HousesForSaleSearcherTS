function mapError(serverErrorName: string): string {
  let errorMessage = '';
  switch (serverErrorName) {
    case 'Email already exists':
      errorMessage = 'The email address is already in use by another account.';
      break;
    case 'Email or password is wrong':
      errorMessage = 'Email or password is wrong';
      break;
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'The password is invalid or the user does not have a password.';
      break;
    case 'USER_DISABLED':
      errorMessage = 'The user account has been disabled by an administrator.';
      break;
    default:
      errorMessage = 'An undefined Error happened.';
  }
  return errorMessage;
}

export default mapError;
