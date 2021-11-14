import { takeEvery } from 'redux-saga/effects';
import * as applicationSagas from './modules/Application/sagas';
import * as applicationActionTypes from './modules/Application/actionTypes';
import * as agentsSagas from './models/agents/sagas';
import * as agentsActionTypes from './models/agents/actionTypes';
import * as agentConfigsSagas from './models/agentConfigs/sagas';
import * as agentConfigsActionTypes from './models/agentConfigs/actionTypes';
import * as proxySagas from './models/proxy/sagas';
import * as proxyActionTypes from './models/proxy/actionTypes';
import * as userSagas from './models/user/sagas';
import * as userActionTypes from './models/user/actionTypes';
import * as resetSagas from './models/reset/sagas';
import * as resetActionTypes from './models/reset/actionTypes';

function* root() {
  yield [
    takeEvery(
      applicationActionTypes.MOUNT,
      applicationSagas.onApplicationMount
    ),
    takeEvery(agentsActionTypes.SNIFF_AGENTS, agentsSagas.onSniffAgents),
    // @ts-ignore - to be fixed
    takeEvery(agentsActionTypes.ADD_AGENT, agentsSagas.onAddAgent),
    // @ts-ignore - to be fixed
    takeEvery(agentsActionTypes.REMOVE_AGENT, agentsSagas.onRemoveAgent),
    // @ts-ignore - to be fixed
    takeEvery(
      agentConfigsActionTypes.FETCH_AGENT_CONFIGS,
      agentConfigsSagas.onFetchAgentConfigs
    ),
    // @ts-ignore - to be fixed
    takeEvery(
      agentConfigsActionTypes.COMMIT_AGENT_CONFIG,
      agentConfigsSagas.onCommitAgentConfig
    ),
    takeEvery(agentsActionTypes.TOGGLE_ALERTS, agentsSagas.onToggleAlerts),
    takeEvery(agentsActionTypes.FETCH_ALERTS, agentsSagas.onFetchAlerts),
    takeEvery(agentsActionTypes.SEND_ALERT, agentsSagas.onSendAlert),
    // @ts-ignore - to be fixed
    takeEvery(agentsActionTypes.TOGGLE_TYPE2, agentsSagas.onToggleType2),
    // @ts-ignore - to be fixed
    takeEvery(
      proxyActionTypes.PROXY_CREATE_WS_CLIENT,
      proxySagas.onCreateWebSocketClient
    ),
    // @ts-ignore - to be fixed
    takeEvery(proxyActionTypes.PROXY_SEND_MESSAGE, proxySagas.onSendMessage),
    takeEvery(userActionTypes.FETCH_USER, userSagas.onFetchUser),
    takeEvery(resetActionTypes.RESET, resetSagas.onReset),
  ];
}

export default root;
