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
    <div className="gc-panel">
      <div className="gc-panel__title">Add agent</div>
      <div className="gc-panel__content">
        <div className="gc-input gc-input--full">
          <label htmlFor="add-agent-id" className="gc-input__label">
            Agent ID
          </label>
          <input
            id="add-agent-id"
            className="tst-add-agent-id gc-input__field"
            value={agentID}
            onChange={event => setAgentID(event.target.value)}
          />
        </div>
        <div className="gc-input gc-input--full">
          <label htmlFor="add-agent-ip" className="gc-input__label">
            Agent IP
          </label>
          <input
            id="add-agent-ip"
            className="tst-add-agent-ip gc-input__field"
            value={agentIP}
            onChange={event => setAgentIP(event.target.value)}
          />
        </div>
        <div className="gc-input gc-input--full">
          <label htmlFor="add-agent-name" className="gc-input__label">
            Agent Name
          </label>
          <input
            id="add-agent-name"
            className="tst-add-agent-name gc-input__field"
            value={agentName}
            onChange={event => setAgentName(event.target.value)}
          />
        </div>
        <div className="gc-input gc-input--full">
          <label htmlFor="add-agent-type" className="gc-input__label">
            Agent Type
          </label>
          <input
            id="add-agent-type"
            className="tst-add-agent-type gc-input__field"
            value={agentType}
            onChange={event => setAgentType(event.target.value)}
          />
        </div>
      </div>
      <div className="gc-panel__footer">
        <button
          className="tst-add-agent-submit gc-btn gc-btn--success gc-btn--full"
          onClick={submit}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddAgent;
