import type * as types from './types';

export const getUser = (state: types.GlobalState): types.User =>
  state.user?.user;

export const getUsername = (state: types.GlobalState): string =>
  getUser(state)?.username || '';

export const getPassword = (state: types.GlobalState): string =>
  getUser(state)?.password || '';

export const getAPIServerIP = (state: types.GlobalState): string =>
  getUser(state)['api-server'] || '';

export const getAPIServerURL = (state: types.GlobalState): string =>
  `http://${getAPIServerIP(state)}:3222` || '';

export const getFeatureFlags = (state: types.GlobalState): Object =>
  getUser(state).featureFlags || {};
