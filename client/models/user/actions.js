// @flow
import * as actionTypes from "./actionTypes";

export const fetchUser = () => ({
  type: actionTypes.FETCH_USER,
});

export const loadUser = (user) => ({
  type: actionTypes.LOAD_USER,
  user,
});

export const fetchUserError = (error: string) => ({
  type: actionTypes.FETCH_USER_FAILURE,
  error,
});
