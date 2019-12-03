// @flow
import React from 'react';
import ControlPanel from './ControlPanel';
import List from './List';
import AddAgent from './AddAgent';

type Props = {
  error: string,
};

const AgentsStatus = (props: Props) => {
  const { error } = props;

  return (
    <div className="agents-status">
      {error && <div className="agents-status__error">{error}</div>}
      <div className="agents-status__section">
        <div className="agents-status__title">Control Panel</div>
        <ControlPanel />
      </div>
      <div className="agents-status__section">
        <div className="agents-status__title">Add Agent</div>
        <AddAgent />
      </div>
      <div className="agents-status__section">
        <div className="agents-status__title">Available Agents</div>
        <List />
      </div>
    </div>
  );
};

AgentsStatus.defaultProps = {
  error: '',
};

export default AgentsStatus;
