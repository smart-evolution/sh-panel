// @flow
import { connect } from 'react-redux';
import * as agentActions from 'client/models/agents/actions';
import * as agentConfigActions from 'client/models/agentConfigs/actions';
import * as agentConfigSelectors from 'client/models/agentConfigs/selectors';
import * as agentSelectors from 'client/models/agents/selectors';
import AgentEdit from './AgentEdit';

const mapStateToProps = (state, ownProps) => {
  const {
    match: { params },
  } = ownProps;
  const agentID = params.agent;
  const agentConfig =
    agentConfigSelectors.getAgentConfigById(state, agentID) || {};
  const agent = agentSelectors.getAgentById(state, agentID);

  return {
    timestamp: new Date(),
    agent,
    agentConfig,
  };
};

const mapDispatchToProps = dispatch => ({
  updateProperty: (agentID, key, value) => {
    dispatch(agentConfigActions.updateProperty(agentID, key, value));
  },
  commitConfig: (agentID, config) => {
    dispatch(agentConfigActions.commitAgentConfig(agentID, config));
  },
  removeAgent: (agentID) => {
    dispatch(agentActions.removeAgent(agentID));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgentEdit);
