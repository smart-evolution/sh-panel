import * as actionTypes from './actionTypes';
import type * as types from './types';
import * as constants from './constants';

type State = {
  wsClient: WebSocket | null;
  status: types.Status;
};

const defaultState = {
  wsClient: null,
  status: constants.STATUS_DISCONNECTED,
};

export default function reducers(
  state: State = defaultState,
  action: types.Action
) {
  switch (action.type) {
    case actionTypes.PROXY_ADD_WS_CLIENT:
      return { ...state, wsClient: action.client };

    case actionTypes.PROXY_REMOVE_WS_CLIENT:
      return { ...state, wsClient: null };

    case actionTypes.PROXY_SET_DEV_STATUS:
      return { ...state, status: action.status };

    default:
      return state;
  }
}
