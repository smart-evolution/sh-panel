// @flow
import { connect } from 'react-redux';
import * as userSelectors from 'client/models/user/selectors';
import AgentsStatus from './AgentsStatus';

const mapStateToProps = state => {
  const { error } = state;
  const user = userSelectors.getUser(state);

  return {
    error,
    user,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AgentsStatus);
