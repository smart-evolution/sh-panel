import { connect } from 'react-redux';
import * as agentActions from 'client/models/agents/actions';
import * as agentSelectors from 'client/models/agents/selectors';
import Alerts from './Alerts';

const mapStateToProps = (state) => ({
  isAlerts: agentSelectors.isAlerts(state),
});

const mapDispatchToProps = (dispatch) => ({
  onToggle: () => {
    dispatch(agentActions.toggleAlerts());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
