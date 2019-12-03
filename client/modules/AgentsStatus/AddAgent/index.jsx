// @flow
import { connect } from 'react-redux';
import * as agentActions from 'client/models/agents/actions';
import AddAgent from './AddAgent';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  addAgent: (agentID, agentIP, agentName, agentType) => {
    dispatch(agentActions.addAgent(agentID, agentIP, agentName, agentType));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAgent);
