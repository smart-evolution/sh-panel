import { connect } from 'react-redux';
import * as agentActions from 'client/models/agents/actions';
import Sniffer from './Sniffer';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  sniffAgents: () => {
    dispatch(agentActions.sniffAgents());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Sniffer);
