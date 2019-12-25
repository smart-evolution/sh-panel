// @flow
import { delay } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import * as userSelectors from 'client/models/user/selectors';
import * as userQueries from 'client/models/user/queries';
import * as alertsActions from '../alerts/actions';
import * as alertsConstants from '../alerts/constants';
import * as actions from './actions';
import * as selectors from './selectors';
import * as constants from './constants';
import * as types from './types';

export function callFetchAgents(host: string, auth: string, period: string) {
  const headers = new Headers();
  headers.set('Authorization', `Basic ${auth}`);

  const request = new Request(`${host}/api/agents?period=${period}`, {
    headers,
    method: 'GET',
    mode: 'cors',
    protocol: 'http:',
    credentials: 'include',
  });

  return fetch(request)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Fetching data error: ${response.statusText}`);
      }

      if (response.status === 204) {
        return {
          _embedded: {
            agents: [],
          },
        };
      }

      return response.json();
    })
    .catch(e => e);
}

export function callFetchAgentsWithTimeout(
  host: string,
  auth: string,
  period: string
) {
  const timer = new Promise((resolve, reject) =>
    setTimeout(
      () => reject('Fetching agents data timed out'),
      constants.FETCH_TIMEOUT
    )
  ).catch(e => e);
  const agentFetch = callFetchAgents(host, auth, period);

  return Promise.race([agentFetch, timer]);
}

export function* onFetchAgents(): Iterable<any> {
  const host = yield select(userSelectors.getAPIServerURL);
  const username = yield select(userSelectors.getUsername);
  const password = yield select(userSelectors.getPassword);

  if (typeof username !== 'string' || typeof password !== 'string') {
    console.error('username or password is not a string');
    return;
  }

  const auth = userQueries.getUserAuth(username, password);
  const period = yield select(selectors.getPeriod);

  if (typeof period !== 'number') {
    console.error('period is not a string');
    return;
  }

  const data = yield call(callFetchAgentsWithTimeout, host, auth, period);
  const agents = data?._embedded?.agents;

  if (agents instanceof Array && agents.length >= 0) {
    yield put(actions.loadAgents(agents));
    return;
  }

  if (typeof data === 'string') {
    yield put(
      alertsActions.addAlert(data, alertsConstants.ALERT_TYPE_ERROR, new Date())
    );
    yield put(actions.fetchAgentsError(data));
    return;
  }

  yield put(actions.fetchAgentsError('Fetching agents data failed'));
  yield put(
    alertsActions.addAlert(
      `Fetching agents data failed`,
      alertsConstants.ALERT_TYPE_ERROR,
      new Date()
    )
  );
}

export function* subscribeOnFetchAgents(): Iterable<any> {
  while (true) {
    yield onFetchAgents();
    yield delay(constants.FETCH_INTERVAL);
  }
}

function callSendAlert() {
  return fetch('/api/sendalert', { method: 'POST' })
    .then(response => response.json())
    .catch(() => 'Send alert failed');
}

export function* onSendAlert(): Iterable<any> {
  yield call(callSendAlert);
}

function callToggleAlerts(host) {
  return fetch(`${host}/api/alerts`, { method: 'POST' })
    .then(response => response.json())
    .catch(() => 'Toggling alerts failed');
}

export function* onToggleAlerts(): Iterable<any> {
  const host = yield select(userSelectors.getAPIServerURL);
  const data = yield call(callToggleAlerts, host);

  if (typeof data === 'object') {
    const isAlerts = data.isAlerts === 'true';
    yield put(actions.setAlerts(isAlerts));
  }
}

function callAlerts(host: string, auth: string) {
  const headers = new Headers();
  headers.set('Authorization', `Basic ${auth}`);

  const request = new Request(`${host}/api/alerts`, {
    headers,
    method: 'GET',
    mode: 'cors',
    protocol: 'http:',
    credentials: 'include',
  });

  return fetch(request)
    .then(response => response.json())
    .catch(() => 'Toggling alerts failed');
}

export function* onFetchAlerts(): Iterable<any> {
  const host = yield select(userSelectors.getAPIServerURL);
  const username = yield select(userSelectors.getUsername);
  const password = yield select(userSelectors.getPassword);

  if (typeof username !== 'string' || typeof password !== 'string') {
    console.error('username or password is not a string');
    return;
  }

  const auth = userQueries.getUserAuth(username, password);

  const data = yield call(callAlerts, host, auth);

  if (typeof data === 'object') {
    const isAlerts = data.isAlerts === 'true';
    yield put(actions.setAlerts(isAlerts));
  } else {
    yield put(
      alertsActions.addAlert(
        'Alerts not fetched properly',
        alertsConstants.ALERT_TYPE_ERROR,
        new Date()
      )
    );
  }
}

function callToggleType2(host, agentID) {
  return fetch(`${host}/api/agents/${agentID}`, { method: 'POST' })
    .then(response => response.json())
    .catch(() => 'Toggling Type2 failed');
}

export function* onToggleType2({
  agentID,
}: {
  agentID: types.AgentID,
}): Iterable<any> {
  const host = yield select(userSelectors.getAPIServerURL);
  const data = yield call(callToggleType2, host, agentID);

  if (typeof data === 'object') {
    const isAlerts = data.isAlerts === 'true';

    yield put(actions.setAlerts(isAlerts));
  }
}

function callSniffAgents(host, auth) {
  const headers = new Headers();
  headers.set('Authorization', `Basic ${auth}`);

  const request = new Request(`${host}/api/sniffagents`, {
    headers,
    method: 'POST',
    mode: 'cors',
    protocol: 'http:',
    credentials: 'include',
  });

  return fetch(request, { method: 'POST' })
    .then(response => response.json())
    .catch(() => 'Toggling alerts failed');
}

export function* onSniffAgents(): Iterable<any> {
  yield put(actions.fetchAgents());
  const host = yield select(userSelectors.getAPIServerURL);
  const username = yield select(userSelectors.getUsername);
  const password = yield select(userSelectors.getPassword);

  if (typeof username !== 'string' || typeof password !== 'string') {
    console.error('username or password is not a string');
    return;
  }

  const auth = userQueries.getUserAuth(username, password);

  const data = yield call(callSniffAgents, host, auth);

  if (data !== undefined && data !== null) {
    yield put(
      alertsActions.addAlert(
        'Agents sniffing in progress',
        alertsConstants.ALERT_TYPE_INFO,
        new Date()
      )
    );
    return;
  }

  yield put(
    alertsActions.addAlert(
      'Agent sniffing failed',
      alertsConstants.ALERT_TYPE_ERROR,
      new Date()
    )
  );
}

function callAddAgent(host, auth, agentID, agentIP, agentName, agentType) {
  const headers = new Headers();
  headers.set('Authorization', `Basic ${auth}`);

  const request = new Request(`${host}/api/agents/add`, {
    headers,
    method: 'POST',
    mode: 'cors',
    protocol: 'http:',
    credentials: 'include',
    body: JSON.stringify({
      agentID,
      agentIP,
      agentName,
      agentType,
    }),
  });

  return fetch(request)
    .then(response => response.json())
    .catch(() => `Adding agent ${agentIP} request failed`);
}

export function* onAddAgent(action: {
  agentID: string,
  agentIP: string,
  agentName: string,
  agentType: string,
  ...
}): Iterable<any> {
  const { agentID, agentIP, agentName, agentType } = action;
  const host = yield select(userSelectors.getAPIServerURL);
  const username = yield select(userSelectors.getUsername);
  const password = yield select(userSelectors.getPassword);

  if (typeof username !== 'string' || typeof password !== 'string') {
    console.error('username or password is not a string');
    return;
  }

  const auth = userQueries.getUserAuth(username, password);
  const data = yield call(
    callAddAgent,
    host,
    auth,
    agentID,
    agentIP,
    agentName,
    agentType
  );

  if (typeof data === 'string') {
    yield put(
      alertsActions.addAlert(data, alertsConstants.ALERT_TYPE_ERROR, new Date())
    );
    yield put(actions.fetchAgentsError(data));
    return;
  }

  if (data !== undefined && data !== null) {
    yield put(
      alertsActions.addAlert(
        'Adding agent succeeded',
        alertsConstants.ALERT_TYPE_INFO,
        new Date()
      )
    );
    return;
  }

  yield put(
    alertsActions.addAlert(
      `Adding agent ${agentIP} failed`,
      alertsConstants.ALERT_TYPE_ERROR,
      new Date()
    )
  );
}

function callRemoveAgent(host, auth, agentID) {
  const headers = new Headers();
  headers.set('Authorization', `Basic ${auth}`);

  const request = new Request(`${host}/api/agents/${agentID}`, {
    headers,
    method: 'DELETE',
    mode: 'cors',
    protocol: 'http:',
    credentials: 'include',
  });

  return fetch(request)
    .then((request) => {
      if (!request.ok) {
        throw new Error(`Removing agent ${agentID} request failed`);
      }
    })
    .catch(() => {
      return `Removing agent ${agentID} request failed`;
    });
}

export function* onRemoveAgent(action: {
  agentID: string,
  ...
}): Iterable<any> {
  const { agentID } = action;
  const host = yield select(userSelectors.getAPIServerURL);
  const username = yield select(userSelectors.getUsername);
  const password = yield select(userSelectors.getPassword);

  if (typeof username !== 'string' || typeof password !== 'string') {
    console.error('username or password is not a string');
    return;
  }

  const auth = userQueries.getUserAuth(username, password);
  const data = yield call(callRemoveAgent, host, auth, agentID);

  if (typeof data === 'string') {
    yield put(
      alertsActions.addAlert(data, alertsConstants.ALERT_TYPE_ERROR, new Date())
    );
    return;
  }

  window.location.href = '/';
}
