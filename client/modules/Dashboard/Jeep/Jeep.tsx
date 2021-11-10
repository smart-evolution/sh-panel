import _ from 'lodash';
import React from 'react';
import { withRouter } from 'react-router';
import { Joystick } from 'graphen';
import type * as agentsTypes from 'client/models/agents/types';
import Switch from 'client/components/Switch';
import type * as proxyTypes from 'client/models/proxy/types';
import * as proxyConstants from 'client/models/proxy/constants';

type Props = {
  agent: agentsTypes.Agent;
  onPositionChange: (arg0: agentsTypes.Agent, arg1: { left: number, top: number, flag: null }) => void;
  onToggle: () => void;
  status: proxyTypes.Status;
};

const Jeep = (props: Props) => {
  const { agent, onPositionChange, onToggle, status } = props;

  const isConnected = status === proxyConstants.STATUS_CONNECTED;
  const isPending = status === proxyConstants.STATUS_PENDING;

  return (
    <div className="jeep-panel">
      <div className="jeep-panel__section">
        <div className="gc-control">
          Device connection
          <div className="c-control__content">
            {!isPending && (
              <Switch
                className=""
                isOn={isConnected}
                onToggle={_.partial(onToggle, agent, isConnected)}
              />
            )}
            {isPending && <div className="gc-loader" />}
          </div>
        </div>
      </div>
      <div className="jeep-panel__section">
        <Joystick
          isEnabled={isConnected}
          onPositionChange={(left: number, top: number) => {
            onPositionChange(agent, { left, top, flag: null });
          }}
        />
      </div>
    </div>
  );
};

export default withRouter(Jeep);
