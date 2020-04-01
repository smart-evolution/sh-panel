// @flow
import React from 'react';
import classNames from 'classnames';
import Switch from 'client/components/Switch';

type Props = {
  className?: string,
  isAlerts: boolean,
  onToggle: () => void,
};

const Alerts = (props: Props) => {
  const { isAlerts, onToggle, className } = props;
  const classes = classNames(
    'shp-admin__card gc-card gc-card--gradient gc-panel',
    className
  );

  return (
    <div className={classes}>
      <div className="gc-panel__title">Set Alerts</div>
      <div className="gc-panel__content">
        When turned on, platform will notify you when something wrong will
        happen.
      </div>
      <div className="gc-separator" />
      <div className="gc-panel__footer">
        <Switch
          className="gc-switch--info"
          isOn={isAlerts}
          onToggle={onToggle}
        />
      </div>
    </div>
  );
};

export default Alerts;
