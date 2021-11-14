import * as actionTypes from './actionTypes';
import type * as types from './types';

const defaultState = {
  isLoading: true,
  error: '',
  agents: [],
  period: 30,
  isAlerts: false,
};

export default function reducers(
  state: types.State = defaultState,
  action: types.Action
) {
  const { agents, error } = action;

  switch (action.type) {
    case actionTypes.FETCH_AGENTS:
      return { ...state, isLoading: true };

    case actionTypes.LOAD_AGENTS:
      return { ...state, agents, isLoading: false };

    case actionTypes.FETCH_AGENTS_ERROR:
      return { ...state, error, isLoading: false };

    case actionTypes.SET_ALERTS:
      return { ...state, isAlerts: action.isAlerts };

    case actionTypes.CHANGE_PERIOD:
      return { ...state, period: action.period };

    default:
      return state;
  }
}
