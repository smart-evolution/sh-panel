export type AgentID = string;

export type Agent = {
  id: AgentID;
  name: string;
  data: any;
  type: string;
  ip: string;
  isOnline: boolean;
};

export type State = {
  isLoading: boolean;
  isAlerts: boolean;
  error: string;
  agents: ReadonlyArray<Agent>;
  period: number;
};

export type GlobalState = {
  agents: State;
};

export type Action = {
  type: string;
  agents: ReadonlyArray<Agent>;
  error: string;
  isAlerts: boolean;
  period: number;
};

export type AgentsApiResponse = {
  _embedded: {
    agents: ReadonlyArray<Agent>;
  };
};

export type AlertsApiResponse = {
  isAlerts: string;
};
