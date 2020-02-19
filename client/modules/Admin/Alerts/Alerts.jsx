// @flow
import React from 'react';
import Switch from 'client/components/Switch';

type Props = {
  isAlerts: boolean,
  onToggle: () => void,
};

const Alerts = (props: Props) => {
  const { isAlerts, onToggle } = props;

  return (
    <div className="gc-card gc-card--default">
      <div className="gc-panel">
        <div className="gc-panel__title">Set Alerts</div>
        <div className="gc-panel__content">
          When turned on, platform will notify you when something wrong will
          happen.
          <p>
            <Switch
              className="control-panel__alerts"
              isOn={isAlerts}
              onToggle={onToggle}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alerts;