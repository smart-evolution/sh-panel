// @flow
export const getUser = (
  state: Object
) => {
  return state.user.user || {};
};

export const getUsername = (
  state: Object
) => {
  return state.user.user.username || '';
};

export const getPassword = (
  state: Object
) => {
  return state.user.user.password || '';
};

export const getAPIServerIP = (
  state: Object
) => {
  return getUser(state)['api-server'] || '';
};

export const getAPIServerURL = (
  state: Object
) => {
  return 'http://' + getAPIServerIP(state) + ':3222' || '';
};

