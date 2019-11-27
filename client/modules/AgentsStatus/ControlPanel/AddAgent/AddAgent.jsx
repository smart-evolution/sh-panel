// @flow
import React, { useState } from 'react';

type Props = {
  addAgent: string => void,
};

const AddAgent = (props: Props) => {
  const { addAgent } = props;
  const [agentIP, setAgentIP] = useState('');

  return (
    <div className="add-agent">
      Add agent
      <input
        className="add-agent__input"
        onChange={event => setAgentIP(event.target.value)}
      />
      <button className="add-agent__button" onClick={() => addAgent(agentIP)} />
    </div>
  );
};

export default AddAgent;
