// @flow
import _ from 'lodash';
import React from 'react';
import Alert from './Alert';

type Props = {
  alerts: $ReadOnly<any>,
};

const AlertPanel = (props: Props) => {
  const { alerts } = props;

  return (
    <div className="alert-panel">
      {_.map(alerts, (alert, index) => {
        const { type, message, timestamp } = alert;
        const key = `alert-${timestamp}`;

        return (
          <Alert key={key} type={type}>
            {message}
          </Alert>
        );
      })}
    </div>
  );
};

export default AlertPanel;
