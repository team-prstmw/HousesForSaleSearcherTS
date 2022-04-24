const logout = (): void => {
  localStorage.removeItem('isloggedIn');

  window.location.replace('/');
};

export default logout;
