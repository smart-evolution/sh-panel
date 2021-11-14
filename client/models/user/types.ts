export type FeatureFlags = {
  isAdminEnabled: boolean;
  isSoundChartEnabled: boolean;
};

export type User = {
  id: string;
  username: string;
  password: string;
  'api-server': string;
  featureFlags: FeatureFlags;
};

export type Action = {
  type: string;
  user: User;
  error: string;
};

export type State = {
  user: User;
};

export type GlobalState = {
  user: State;
};

export type ApiResponse = {
  id: string;
  password: string;
  username: string;
  _embedded: {
    featureFlags: FeatureFlags;
  };
};
