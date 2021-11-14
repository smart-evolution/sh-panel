import type * as types from 'client/models/agents/types';

export const get = (agent: types.Agent): boolean => agent.isOnline;

export const getUserAuth = (username: string, password: string): string =>
  btoa(`${username}:${password}`);
