import _ from 'lodash';
import * as agentTypes from 'client/models/agents/types';
import type * as types from './types';

/* eslint-disable import/prefer-default-export */
export const getAgentConfigByAgentId = (
  agentConfigs: ReadonlyArray<types.AgentConfig>,
  agentID: agentTypes.AgentID
): types.AgentConfig => _.find(agentConfigs, { agentId: agentID }) || {};
/* eslint-enable import/prefer-default-export */
