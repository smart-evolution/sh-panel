import type * as agentTypes from 'client/models/agents/types';

export type AgentConfig = {
  id: string;
  agentId: agentTypes.AgentID;
  name: string;
  temperature: number;
};

export type AgentConfigs = Array<AgentConfig>;

export type State = {
  agentConfigs: AgentConfigs;
  error: string;
};

export type GlobalState = {
  agentConfigs: State;
};

export type Action = {
  type: string;
  key: string;
  value: string;
  agentID: agentTypes.AgentID;
  configs: AgentConfigs;
};

export type ApiResponse = {
  _embedded: {
    configs: AgentConfigs;
  };
};
