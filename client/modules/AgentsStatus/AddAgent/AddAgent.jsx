// @flow
import React, { useState } from 'react';

type Props = {
  addAgent: (string, string, string, string) => void,
};

const AddAgent = (props: Props) => {
  const { addAgent } = props;
  const [agentID, setAgentID] = useState('');
  const [agentIP, setAgentIP] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentType, setAgentType] = useState('');

  return (
    <div className="add-agent">
      <div className="c-input">
        <label htmlFor="firstName" className="c-input__label">
          Agent ID
        </label>
        <input
          id="add-agent-id"
          className="c-input__field"
          onChange={event => setAgentID(event.target.value)}
        />
      </div>
      <div className="c-input">
        <label htmlFor="add-agent-ip" className="c-input__label">
          Agent IP
        </label>
        <input
          id="add-agent-ip"
          className="c-input__field"
          onChange={event => setAgentIP(event.target.value)}
        />
      </div>
      <div className="c-input">
        <label htmlFor="add-agent-ip" className="c-input__label">
          Agent Name
        </label>
        <input
          id="add-agent-name"
          className="add-agent-name"
          onChange={event => setAgentName(event.target.value)}
        />
      </div>
      <div className="c-input">
        <label htmlFor="add-agent-type" className="c-input__label">
          Agent Type
        </label>
        <input
          id="add-agent-type"
          className="c-input__field"
          onChange={event => setAgentType(event.target.value)}
        />
      </div>
      <button
        className="c-btn c-btn--accept"
        onClick={() => addAgent(agentID, agentIP, agentName, agentType)}
      >
        Add
      </button>
    </div>
  );
};

export default AddAgent;
