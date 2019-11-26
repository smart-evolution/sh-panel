// @flow
import React, { useState } from 'react';
import Switch from 'client/components/Switch';
import AddAgent from './AddAgent';

type Props = {
  isAlerts: boolean,
  onToggle: () => void,
  sendAlert: () => void,
  sniffAgents: () => void,
};

const ControlPanel = (props: Props) => {
  const { isAlerts, addAgent, onToggle, sendAlert, sniffAgents } = props;

  return (
    <div className="control-panel">
      <div className="control-panel__title">Control Panel</div>
      <div className="control-panel__dashboard">
        <div className="control-panel__control">
          Sniff agents
          <button className="control-panel__send-alert" onClick={sniffAgents} />
        </div>
        <div className="control-panel__control">
          <AddAgent />
        </div>
        <div className="control-panel__control">
          Alerts
          <Switch
            className="control-panel__alerts"
            isOn={isAlerts}
            onToggle={onToggle}
          />
        </div>
        <div className="control-panel__control">
          Send alert
          <button className="control-panel__send-alert" onClick={sendAlert} />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
