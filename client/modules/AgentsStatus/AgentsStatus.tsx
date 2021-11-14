import React from 'react';
import List from './List';

type Props = {
  error: string;
};

const AgentsStatus = (props: Props) => {
  const { error } = props;

  return (
    <div className="agents-status">
      {error && <div className="agents-status__error">{error}</div>}
      <div className="agents-status__section">
        <div className="agents-status__title">Available Agents</div>
        <List />
      </div>
    </div>
  );
};

export default AgentsStatus;
