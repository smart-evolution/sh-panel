// @flow
import { all, put, take, fork } from 'redux-saga/effects';
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

  yield all([put(agentActions.fetchAgents())]);
  yield take([agentActionTypes.LOAD_AGENTS]);

  yield put(agentConfigActions.fetchAgentConfig());
  yield take([agentConfigActionTypes.LOAD_AGENT_CONFIGS]);

  yield put(actions.loaded());
}
/* eslint-enable import/prefer-default-export */
