// @flow
import React from 'react';

type Props = {
  reset: () => void,
};

const Reset = (props: Props) => {
  const { reset } = props;

  return (
    <div className="shp-admin__card gc-card gc-card--default gc-panel">
      <div className="gc-panel__title">Reset platform</div>
      <div className="gc-panel__content">
        Restore whole platform to default.
      </div>
      <div className="gc-panel__footer">
        <button className="gc-btn gc-btn--danger" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Reset;
