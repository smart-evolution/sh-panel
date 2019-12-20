// @flow
import React, { useState, useCallback } from 'react';

type Props = {
  addAgent: (string, string, string, string) => void,
};

const AddAgent = (props: Props) => {
  const { addAgent } = props;
  const [agentID, setAgentID] = useState('');
  const [agentIP, setAgentIP] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentType, setAgentType] = useState('');

  const submit = useCallback(() => {
    addAgent(agentID, agentIP, agentName, agentType);
    setAgentID('');
    setAgentIP('');
    setAgentName('');
    setAgentType('');
  }, [
    addAgent,
    agentID,
    agentIP,
    agentName,
    agentType,
    setAgentID,
    setAgentIP,
    setAgentName,
    setAgentType,
  ]);

  return (
    <div className="add-agent">
      <div className="c-input">
        <label htmlFor="add-agent-id" className="c-input__label">
          Agent ID
        </label>
        <input
          id="add-agent-id"
          className="tst-add-agent-id c-input__field"
          value={agentID}
          onChange={event => setAgentID(event.target.value)}
        />
      </div>
      <div className="c-input">
        <label htmlFor="add-agent-ip" className="c-input__label">
          Agent IP
        </label>
        <input
          id="add-agent-ip"
          className="tst-add-agent-ip c-input__field"
          value={agentIP}
          onChange={event => setAgentIP(event.target.value)}
        />
      </div>
      <div className="c-input">
        <label htmlFor="add-agent-name" className="c-input__label">
          Agent Name
        </label>
        <input
          id="add-agent-name"
          className="tst-add-agent-name c-input__field"
          value={agentName}
          onChange={event => setAgentName(event.target.value)}
        />
      </div>
      <div className="c-input">
        <label htmlFor="add-agent-type" className="c-input__label">
          Agent Type
        </label>
        <input
          id="add-agent-type"
          className="tst-add-agent-type c-input__field"
          value={agentType}
          onChange={event => setAgentType(event.target.value)}
        />
      </div>
      <button
        className="tst-add-agent-submit c-btn c-btn--accept"
        onClick={submit}
      >
        Add
      </button>
    </div>
  );
};

export default AddAgent;
