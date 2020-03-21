// @flow
import React from 'react';

type Props = {
  sniffAgents: () => void,
};

const Sniffer = (props: Props) => {
  const { sniffAgents } = props;

  return (
    <div className="shp-admin__card gc-card gc-card--default gc-panel">
      <div className="gc-panel__title">Agent lookup</div>
      <div className="gc-panel__content">
        Agent lookup searches for compatible devices in your network.
      </div>
      <div className="gc-panel__footer">
        <button className="gc-btn gc-btn--primary" onClick={sniffAgents}>
          Search for agents
        </button>
      </div>
    </div>
  );
};

export default Sniffer;
