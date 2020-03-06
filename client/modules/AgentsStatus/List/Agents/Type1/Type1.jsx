// @flow
import _ from 'lodash';
import React from 'react';
import { Icon } from 'graphen';
import * as agentTypes from 'client/models/agents/types';
import * as agentQueries from 'client/models/agents/queries';
import * as agentConfigsTypes from 'client/models/agentConfigs/types';

type Props = {
  agent: agentTypes.Agent,
  agentConfig: agentConfigsTypes.AgentConfig,
};

const Type1 = (props: Props) => {
  const { agent, agentConfig } = props;

  const temperature = agentQueries.getTemperature(agent);
  const isMotion = agentQueries.isMotion(agent);
  const isGas = agentQueries.isGas(agent);

  const onlineClass = !agent.isOnline ? 'agent-type1--disabled' : '';
  const motionColor = isMotion ? 'agent-type1__icon--alert' : '';
  const gasColor = isGas ? 'agent-type1__icon--alert' : '';

  const humanName = _.isEmpty(agentConfig.name) ? '' : `${agentConfig.name} - `;

  return (
    <li className={`tst-agent-status-${agent.id} agent-type1 ${onlineClass}`}>
      <a className="agent-type1__link" href={`/agent/${agent.id}`}>
        {humanName}
        {agent.name} <span className="agent-type1__type">[{agent.type}]</span>
      </a>{' '}
      -{' '}
      <span>
        {temperature}&#8451; <Icon type="thermometer-half" />
        <Icon className={motionColor} type="man" />
        <Icon className={gasColor} type="fire" />
      </span>
    </li>
  );
};

export default Type1;
