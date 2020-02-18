// @flow
import { connect } from 'react-redux';
import * as agentActions from 'client/models/agents/actions';
import SendAlert from './SendAlert';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  sendAlert: () => {
    dispatch(agentActions.sendAlert());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SendAlert);
