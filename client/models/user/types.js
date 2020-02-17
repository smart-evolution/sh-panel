// @flow
export type FeatureFlags = {
  isAdminEnabled: boolean,
  isSoundChartEnabled: boolean,
};

export type User = {
  id: string,
  username: string,
  password: string,
  'api-server': string,
  featureFlags: FeatureFlags,
};
