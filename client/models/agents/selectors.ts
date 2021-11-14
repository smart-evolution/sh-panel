import _ from 'lodash';
import type * as types from './types';

export const getAgents = (
  state: types.GlobalState
): ReadonlyArray<types.Agent> => state.agents.agents;

export const isLoading = (state: types.GlobalState): boolean =>
  state.agents.isLoading;

export const isAlerts = (state: types.GlobalState): boolean =>
  state.agents.isAlerts;

export const getAgentById = (state: types.GlobalState, id: string) => {
  const agents = getAgents(state);
  return _.find(agents, { id });
};

export const getPeriod = (state: types.GlobalState): number =>
  state.agents.period;
