import _ from 'lodash';
import { connect } from 'react-redux';
import * as agentsActions from 'client/models/agents/actions';
import Type1 from './Type1';

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onScroll: (period) => {
    dispatch(agentsActions.changePeriod(_.round(period)));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Type1);
