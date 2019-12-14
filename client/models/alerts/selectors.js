import _ from 'lodash';

export const getAlerts = state => state.alerts.alerts;

export const getFreshAlerts = state => _.reverse(getAlerts(state));
