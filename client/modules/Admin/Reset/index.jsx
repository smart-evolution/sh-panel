// @flow
import { connect } from 'react-redux';
import * as resetActions from 'client/models/reset/actions';
import Reset from './Reset';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  reset: () => {
    dispatch(resetActions.reset());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Reset);
