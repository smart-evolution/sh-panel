import _ from 'lodash';
import { delay } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';
import * as userSelectors from 'client/models/user/selectors';
import * as userQueries from 'client/models/user/queries';
import * as alertsActions from '../alerts/actions';
import * as alertsConstants from '../alerts/constants';

export function callFetchAgents(host, auth, period) {
  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + auth);

  const request = new Request(`${host}/api/agents?period=${period}`, {
    headers,
    method: 'GET',
    mode: 'cors',
    protocol:'http:',
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

export function* onFetchAgents() {
  const host = yield select(userSelectors.getAPIServerURL);
  const username = yield select(userSelectors.getUsername);
  const password = yield select(userSelectors.getPassword);
  const auth = userQueries.getUserAuth(username, password);
  const period = yield select(selectors.getPeriod);
  const data = yield call(callFetchAgents, host, auth, period);

  if (_.isEmpty(data)) {
    yield put(actions.fetchAgentsError('Fetched data empty'));
    return;
  }

  const agents = data?._embedded?.agents;

  if (_.isArray(agents)) {
    yield put(actions.loadAgents(agents));
  } else {
    yield put(actions.fetchAgentsError('Fetched data is not array of agents'));
  }
}

export function* subscribeOnFetchAgents() {
  while (true) {
    yield onFetchAgents();
    yield delay(5000);
  }
}

function callSendAlert() {
  return fetch('/api/sendalert', { method: 'POST' })
    .then(response => response.json())
    .catch(() => 'Send alert failed');
}

export function* onSendAlert() {
  yield call(callSendAlert);
}

function callToggleAlerts(host) {
  return fetch(`${host}/api/alerts`, { method: 'POST' })
    .then(response => response.json())
    .catch(() => 'Toggling alerts failed');
}

export function* onToggleAlerts() {
  const host = yield select(userSelectors.getAPIServerURL);
  const data = yield call(callToggleAlerts, host);

  if (_.isObject(data)) {
    const isAlerts = data.isAlerts === 'true';

    yield put(actions.setAlerts(isAlerts));
  }
}

function callAlerts() {
  return fetch('/api/alerts')
    .then(response => response.json())
    .catch(() => 'Toggling alerts failed');
}

export function* onFetchAlerts() {
  const data = yield call(callAlerts);

  if (_.isObject(data)) {
    const isAlerts = data.isAlerts === 'true';

    yield put(actions.setAlerts(isAlerts));
  } else {
    yield put(
      alertsActions.addAlert(
        'Alerts not fetched properly',
        alertsConstants.ALERT_TYPE_ERROR
      )
    );
  }
}

function callToggleType2(host, agentID) {
  return fetch(`${host}/api/agents/${agentID}`, { method: 'POST' })
    .then(response => response.json())
    .catch(() => 'Toggling Type2 failed');
}

export function* onToggleType2({ agentID }) {
  const host = yield select(userSelectors.getAPIServerURL);
  const data = yield call(callToggleType2, host, agentID);

  if (_.isObject(data)) {
    const isAlerts = data.isAlerts === 'true';

    yield put(actions.setAlerts(isAlerts));
  }
}

function callSniffAgents(host) {
  return fetch(`${host}/api/sniffagents`, { method: 'POST' })
    .then(response => response.json())
    .catch(() => 'Toggling alerts failed');
}

export function* onSniffAgents() {
  yield put(actions.fetchAgents());

  const host = yield select(userSelectors.getAPIServerURL);
  const data = yield call(callSniffAgents, host);

  if (!_.isEmpty(data)) {
    yield put(
      alertsActions.addAlert(
        'Agents sniffing in progress',
        alertsConstants.ALERT_TYPE_INFO
      )
    );
    return;
  }
  yield put(
    alertsActions.addAlert(
      'Agent sniffing failed',
      alertsConstants.ALERT_TYPE_ERROR
    )
  );
}
