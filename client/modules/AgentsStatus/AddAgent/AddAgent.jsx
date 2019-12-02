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
        <label className="c-input__label">Agent ID</label>
        <input
          className="c-input__field"
          onChange={event => setAgentID(event.target.value)}
        />
      </div>
      <div className="c-input">
        <label className="c-input__label">Agent IP</label>
        <input
          className="c-input__field"
          onChange={event => setAgentIP(event.target.value)}
        />
      </div>
      <div className="c-input">
        <label className="c-input__label">Agent Name</label>
        <input
          className="c-input__field"
          onChange={event => setAgentName(event.target.value)}
        />
      </div>
      <div className="c-input">
        <label className="c-input__label">Agent Type</label>
        <input
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
