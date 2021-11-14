import type * as types from './types';

/* eslint-disable import/prefer-default-export */
export const getIsLoaded = (state: types.State): boolean =>
  state.application.isLoaded;
/* eslint-enable import/prefer-default-export */
