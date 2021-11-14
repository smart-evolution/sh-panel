// @flow
import { connect } from 'react-redux';
import Admin from './Admin';

const mapStateToProps = (state) => {
  const { error } = state;

  return {
    error,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
