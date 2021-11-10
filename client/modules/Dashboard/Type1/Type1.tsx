import React from 'react';
import { Scroller } from 'graphen';
import * as agentsTypes from 'client/models/agents/types';
import * as userTypes from 'client/models/user/types';
import * as userSelectors from 'client/models/user/selectors';
import TemperaturePanel from '../TemperaturePanel';
import SoundPanel from '../SoundPanel';
import CurrentPanel from '../CurrentPanel';

type Props = {
  pathname: string,
  agent: agentsTypes.Agent,
  user: userTypes.User,
  onScroll: () => void,
};

const Type1 = (props: Props) => {
  const { agent, user, pathname, onScroll } = props;

  const featureFlags = userSelectors.getFeatureFlags(user);
  const { isSouncChartEnabled } = featureFlags;

  return (
    <>
      <div className="dashboard__cell dashboard__cell--full">
        <div className="gc-panel gc-panel--separator">
          <div className="gc-panel__content">
            <a
              className="tst-edit-btn gc-btn gc-btn--primary"
              href={`${pathname}/edit`}
            >
              Edit
            </a>
          </div>
        </div>
      </div>
      <div className="dashboard__cell dashboard__cell--full">
        <div className="gc-panel gc-panel--separator">
          <div className="gc-panel__content">
            <Scroller onScrollChange={onScroll} min={30} max={300} />
          </div>
        </div>
      </div>
      <div className="dashboard__cell dashboard__cell--full">
        <CurrentPanel agent={agent} />
      </div>
      <div className="dashboard__cell dashboard__cell--full">
        <TemperaturePanel agent={agent} />
      </div>
      <div className="dashboard__cell dashboard__cell--full">
        {isSouncChartEnabled && <SoundPanel />}
      </div>
    </>
  );
};

export default Type1;
