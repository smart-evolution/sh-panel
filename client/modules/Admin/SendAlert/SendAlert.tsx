import React from 'react';

type Props = {
  sendAlert: () => void;
};

const SendAlert = (props: Props) => {
  const { sendAlert } = props;

  return (
    <div className="shp-admin__card gc-card gc-card--default gc-panel">
      <div className="gc-panel__title">Send Alert</div>
      <div className="gc-panel__content">
        Broadcast alert to all devices so they can respond
      </div>
      <div className="gc-panel__footer">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="control-panel__send-alert"
          onClick={sendAlert}
        />
      </div>
    </div>
  );
};

export default SendAlert;
