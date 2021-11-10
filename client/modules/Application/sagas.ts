import { put, take, fork, race } from 'redux-saga/effects';
import * as userActions from 'client/models/user/actions';
import * as userActionTypes from 'client/models/user/actionTypes';
import * as agentsSagas from 'client/models/agents/sagas';
import * as agentActions from 'client/models/agents/actions';
import * as agentActionTypes from 'client/models/agents/actionTypes';
import * as agentConfigActions from 'client/models/agentConfigs/actions';
import * as agentConfigActionTypes from 'client/models/agentConfigs/actionTypes';
import * as actions from './actions';

/* eslint-disable import/prefer-default-export */
export function* onApplicationMount(): Iterable<any> {
  yield put(userActions.fetchUser());
  yield take([userActionTypes.LOAD_USER]);
  yield fork(agentsSagas.subscribeOnFetchAgents);
  yield fork(agentsSagas.onFetchAlerts);

  yield put(agentActions.fetchAgents());
  // @ts-ignore - to be fixed
  yield race([
    take([agentActionTypes.LOAD_AGENTS]),
    take([agentActionTypes.FETCH_AGENTS_ERROR]),
  ]);

  yield put(agentConfigActions.fetchAgentConfig());
  // @ts-ignore - to be fixed
  yield race([
    take([agentConfigActionTypes.LOAD_AGENT_CONFIGS]),
    take([agentConfigActionTypes.FETCH_AGENT_CONFIGS_ERROR]),
  ]);

  yield put(actions.loaded());
}
/* eslint-enable import/prefer-default-export */
