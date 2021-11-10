// @flow
import { call, select } from 'redux-saga/effects';
import * as userSelectors from 'client/models/user/selectors';
import * as constants from './constants';

function callReset(host: string) {
  return fetch(`${host}${constants.RESET_ENDPOINT}`, {
    method: 'POST',
  })
    .then((response) => response.json())
    .catch(() => 'Restoring settings failed');
}

/* eslint-disable import/prefer-default-export */
export function* onReset(): Iterable<any> {
  const host = yield select(userSelectors.getAPIServerURL);
  yield call(callReset, host);
  window.location.href = '/login/logout';
}
/* eslint-enable import/prefer-default-export */
