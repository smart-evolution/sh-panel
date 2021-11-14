import * as agentTypes from 'client/models/agents/types';
import type * as types from './types';
import * as queries from './queries';

export const getAgentConfigs = (
  state: types.GlobalState
): ReadonlyArray<types.AgentConfig> => state.agentConfigs.agentConfigs || [];

export const getAgentConfigById = (
  state: types.GlobalState,
  agentID: agentTypes.AgentID
): types.AgentConfig => {
  const agentConfigs = getAgentConfigs(state);
  const config = queries.getAgentConfigByAgentId(agentConfigs, agentID);
  return config;
};
