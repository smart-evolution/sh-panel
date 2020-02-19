// @flow
import React from 'react';

type Props = {
  sniffAgents: () => void,
};

const Sniffer = (props: Props) => {
  const { sniffAgents } = props;

  return (
    <div className="gc-card gc-card--default">
      <div className="gc-panel">
        <div className="gc-panel__title">Agent lookup</div>
        <div className="gc-panel__content">
          Agent lookup searches for compatible devices in your network.
          <p>
            <button className="gc-btn gc-btn--success" onClick={sniffAgents}>
              Search for agents
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sniffer;
