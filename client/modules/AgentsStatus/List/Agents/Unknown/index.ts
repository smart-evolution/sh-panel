import { connect } from 'react-redux';
import Unknown from './Unknown';

const mapStateToProps = (state, ownProps) => {
  const { agent } = ownProps;

  return {
    agent,
  };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Unknown);
