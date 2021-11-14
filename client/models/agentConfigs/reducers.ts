import _ from 'lodash';
import * as actionTypes from './actionTypes';
import type * as types from './types';
import * as queries from './queries';

const defaultState = {
  error: '',
  agentConfigs: [],
};

function updateProperty(state: types.State, action: types.Action) {
  const { key, value, agentID } = action;
  const { agentConfigs } = state;
  let newAgentConfigs = [];

  const agentConfig =
    queries.getAgentConfigByAgentId(agentConfigs, agentID) || {};

  if (_.isEmpty(agentConfig)) {
    const newAgentConfig = {
      agentId: agentID,
      [action.key]: action.value,
    };
    newAgentConfigs = _.concat(agentConfigs, [newAgentConfig]);
  } else {
    agentConfig[key] = value;
    newAgentConfigs = _.concat(
      _.filter(agentConfigs, (c) => c.agentId !== agentID),
      [agentConfig]
    );
  }

  return { ...state, agentConfigs: newAgentConfigs };
}

export default function reducers(
  state: types.State = defaultState,
  action: types.Action
) {
  switch (action.type) {
    case actionTypes.LOAD_AGENT_CONFIGS:
      return { ...state, agentConfigs: action.configs };

    case actionTypes.UPDATE_PROPERTY:
      return updateProperty(state, action);

    default:
      return state;
  }
}
