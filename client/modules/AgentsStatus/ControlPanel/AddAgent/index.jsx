// @flow
import { connect } from 'react-redux';
import * as agentActions from 'client/models/agents/actions';
import AddAgent from './AddAgent';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  addAgent: agentIP => {
    dispatch(agentActions.addAgent(agentIP));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAgent);
