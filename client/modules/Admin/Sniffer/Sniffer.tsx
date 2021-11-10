import React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string,
  sniffAgents: () => void,
};

const Sniffer = (props: Props) => {
  const { sniffAgents, className } = props;
  const classes = classNames(
    'shp-admin__card gc-card gc-card--gradient gc-panel',
    className
  );

  return (
    <div className={classes}>
      <div className="gc-panel__title">Agent lookup</div>
      <div className="gc-panel__content">
        Agent lookup searches for compatible devices in your network.
      </div>
      <div className="gc-separator" />
      <div className="gc-panel__footer">
        <button className="gc-btn gc-btn--primary" onClick={sniffAgents}>
          Search for agents
        </button>
      </div>
    </div>
  );
};

export default Sniffer;
