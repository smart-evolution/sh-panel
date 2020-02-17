// @flow
import React from 'react';
import { Accordion } from 'graphen';
import * as userTypes from 'client/models/user/types';
import ControlPanel from './ControlPanel';
import List from './List';
import AddAgent from './AddAgent';

type Props = {
  error: string,
  user: userTypes.User,
};

const AgentsStatus = (props: Props) => {
  const { error, user } = props;
  const { featureFlags } = user;
  const { isAdminEnabled } = featureFlags;

  return (
    <div className="agents-status">
      {error && <div className="agents-status__error">{error}</div>}
      {isAdminEnabled && (
        <Accordion title="Control Panel">
          <ControlPanel />
        </Accordion>
      )}
      <Accordion className="tst-add-agent" title="Add Agent">
        <AddAgent />
      </Accordion>
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
