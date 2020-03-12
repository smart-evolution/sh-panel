// @flow
import React from 'react';
import * as agentTypes from 'client/models/agents/types';

type Props = {
  agent: agentTypes.Agent,
};

const Unknown = (props: Props) => {
  const { agent } = props;

  return (
    <li className={`tst-agent-status-${agent.id} agent-unknown`}>
      <a className="agent-unknown__link" href={`/agent/${agent.id}`}>
        Unknown agent
      </a>{' '}
      [ID: {agent.id} / Name: {agent.name} / Type: {agent.type}]
    </li>
  );
};

export default Unknown;
