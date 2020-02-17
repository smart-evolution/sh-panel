// @flow
import * as types from './types';

export const getUser = (state: Object): types.User => {
  return state.user?.user || {};
};

export const getUsername = (state: Object): string => {
  return getUser(state).username || '';
};

export const getPassword = (state: Object): string => {
  return getUser(state).password || '';
};

export const getAPIServerIP = (state: Object): string => {
  return getUser(state)['api-server'] || '';
};

export const getAPIServerURL = (state: Object): string => {
  return `http://${getAPIServerIP(state)}:3222` || '';
};

export const getFeatureFlags = (state: Object): Object => {
  return getUser(state).featureFlags || {};
};
