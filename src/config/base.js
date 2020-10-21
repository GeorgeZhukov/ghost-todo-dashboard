const base = {
  environment: '',
  apiUrl: '',
  tokenPrefix: 'Token',
  localStorageTokenKey: 'token',
  urls: {
    tasks: '/tasks/',
    auth: '/api-token-auth/',
    projects: '/projects/',
    users: '/users/',
    currentUser: '/users/current_user/'
  },
};

export default base;
