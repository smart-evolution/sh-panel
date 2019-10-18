// @flow
export const get = (agent: types.Agent): boolean => agent.isOnline;

export const getUserAuth = (username: string, password: string) => btoa(`${username}:${password}`);
