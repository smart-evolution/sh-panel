import * as proxyConstants from 'client/models/proxy/constants';
import type * as types from './types';

export const getWsClient = (state: types.GlobalState): WebSocket =>
  state.proxy.wsClient;

export const getStatus = (state: types.GlobalState): string =>
  state.proxy.status;

export const getIsDevConnected = (state: types.GlobalState): boolean =>
  state.proxy.status === proxyConstants.STATUS_CONNECTED;
