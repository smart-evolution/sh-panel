import _ from 'lodash';
import { put, call, select } from 'redux-saga/effects';
import * as alertsActions from 'client/models/alerts/actions';
import * as alertsConstants from 'client/models/alerts/constants';
import * as agentTypes from 'client/models/agents/types';
import * as userSelectors from 'client/models/user/selectors';
import * as actions from './actions';
import type * as types from './types';
import * as constants from './constants';
import * as userQueries from '../user/queries';

function callFetchAgentConfigs(
  host: string,
  auth: string,
  agentID: agentTypes.AgentID
) {
  const headers = new Headers();
  headers.set('Authorization', `Basic ${auth}`);

  const request = new Request(
    `${host}/${constants.AGENT_CONFIG_ENDPOINT}/${agentID}`,
    {
      headers,
      method: 'GET',
      mode: 'cors',
      // @ts-ignore - to be fixed
      protocol: 'http:',
      credentials: 'include',
    }
  );

  return fetch(request)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Fetching data error: ${response.statusText}`);
      }

      if (response.status === 204) {
        throw new Error('No data available');
      }

      return response.json();
    })
    .catch((e) => e);
}

export function* onFetchAgentConfigs({
  agentID,
}: {
  agentID: string;
}): Iterable<any> {
  const host = yield select(userSelectors.getAPIServerURL);
  const username = yield select(userSelectors.getUsername);
  const password = yield select(userSelectors.getPassword);

  if (typeof username !== 'string' || typeof password !== 'string') {
    console.error('username or password is not a string');
    return;
  }

  const auth = userQueries.getUserAuth(username, password);
  const data: types.ApiResponse = yield call(
    callFetchAgentConfigs,
    host,
    auth,
    agentID
  );

  if (data) {
    const agentConfigs = data?._embedded?.configs || [];
    yield put(actions.loadAgentConfigs(agentConfigs));
    return;
  }

  if (typeof data === 'string') {
    yield put(
      alertsActions.addAlert(data, alertsConstants.ALERT_TYPE_ERROR, new Date())
    );
    yield put(actions.fetchAgentConfigError(data));
    return;
  }

  yield put(actions.fetchAgentConfigError('Fetching agent config failed'));
  yield put(
    alertsActions.addAlert(
      'Fetching agent config failed',
      alertsConstants.ALERT_TYPE_ERROR,
      new Date()
    )
  );
}

function callCommitAgentConfig(
  host,
  auth: string,
  agentID: agentTypes.AgentID,
  config: types.AgentConfig
) {
  const headers = new Headers();
  headers.set('Authorization', `Basic ${auth}`);

  const request = new Request(
    `${host}/${constants.AGENT_CONFIG_ENDPOINT}/${agentID}`,
    {
      headers,
      method: 'POST',
      mode: 'cors',
      // @ts-ignore - to be fixed
      protocol: 'http:',
      credentials: 'include',
      body: JSON.stringify(config),
    }
  );

  return fetch(request)
    .then((response) => response.json())
    .catch(() => 'Updating agent config failed');
}

export function* onCommitAgentConfig({
  agentID,
  config,
}: {
  agentID: agentTypes.AgentID;
  config: types.AgentConfig;
}): Iterable<any> {
  const host = yield select(userSelectors.getAPIServerURL);
  const username = yield select(userSelectors.getUsername);
  const password = yield select(userSelectors.getPassword);

  if (typeof username !== 'string' || typeof password !== 'string') {
    console.error('username or password is not a string');
    return;
  }

  const auth = userQueries.getUserAuth(username, password);
  const response = yield call(
    callCommitAgentConfig,
    host,
    auth,
    agentID,
    config
  );

  if (!_.isEmpty(response)) {
    yield put(
      alertsActions.addAlert(
        'Updated agent config successfully',
        alertsConstants.ALERT_TYPE_INFO,
        new Date()
      )
    );
  } else {
    yield put(
      alertsActions.addAlert(
        'Updating agent config failed',
        alertsConstants.ALERT_TYPE_ERROR,
        new Date()
      )
    );
  }
}
