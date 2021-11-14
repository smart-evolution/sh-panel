import _ from 'lodash';
import * as actionTypes from './actionTypes';
import type * as types from './types';
import * as constants from './constants';

const defaultState: types.State = {
  alerts: [],
};

export default function reducers(
  state: types.State = defaultState,
  action: types.Action
) {
  const { alerts } = state;
  const alert: types.Alert = {
    message: action.message,
    type: action.alertType,
    timestamp: action.timestamp,
    isOld: false,
  };

  switch (action.type) {
    case actionTypes.ADD:
      return {
        alerts: _.slice(_.concat([alert], alerts), 0, constants.ALERT_LIMIT),
      };
    default:
      return state;
  }
}
