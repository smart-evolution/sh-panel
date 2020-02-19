// @flow
import React from 'react';

type Props = {
  sendAlert: () => void,
};

const SendAlert = (props: Props) => {
  const { sendAlert } = props;

  return (
    <div className="gc-panel">
      <div className="gc-panel__title">Send Alert</div>
      <div className="gc-panel__content">
        Broadcast alert to all devices so they can respond
        <p>
          <button className="control-panel__send-alert" onClick={sendAlert} />
        </p>
      </div>
    </div>
  );
};

export default SendAlert;
