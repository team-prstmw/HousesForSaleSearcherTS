const mapError = (state) => {
  switch (state) {
    case 'EMAIL_EXISTS':
      return 'The email or password is incorrect.';
    case 'OPERATION_NOT_ALLOWED':
      return 'Password sign-in is disabled for this project.';
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      return 'We have blocked all requests from this device due to unusual activity. Try again later.';
    case 'EMAIL_NOT_FOUND':
      return 'The email or password is incorrect.';
    case 'INVALID_PASSWORD':
      return 'The email or password is incorrect.';
    case 'USER_DISABLED':
      return 'The user account has been disabled by an administrator.';
    case 'MISSING_EMAIL':
      return 'The user did not enter email in the text field.';
    case 'SUCCESS':
      return 'Success';
    default:
      return 'An error happened.';
  }
};

export default mapError;
