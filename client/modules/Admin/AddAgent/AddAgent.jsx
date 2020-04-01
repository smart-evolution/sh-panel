// @flow
import React, { useState, useCallback } from 'react';
import { Validation } from 'graphen';
import classNames from 'classnames';
import * as queries from './queries';

type Props = {
  className?: string,
  addAgent: (string, string, string, string) => void,
};

const AddAgent = (props: Props) => {
  const { addAgent, className } = props;
  const [agentID, setAgentID] = useState('');
  const [agentIP, setAgentIP] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentType, setAgentType] = useState('');

  const [idValidation, setIDValidation] = useState(null);
  const [ipValidation, setIPValidation] = useState(null);
  const [nameValidation, setNameValidation] = useState(null);
  const [typeValidation, setTypeValidation] = useState(null);

  const handleIDChange = useCallback(
    event => {
      const id = event.target.value;
      setAgentID(id);
      setIDValidation(queries.validateID(id));
    },
    [agentID, setAgentID]
  );
  const handleIPChange = useCallback(
    event => {
      const ip = event.target.value;
      setAgentIP(ip);
      setIPValidation(queries.validateIP(ip));
    },
    [agentIP, setAgentIP]
  );
  const handleNameChange = useCallback(
    event => {
      const name = event.target.value;
      setAgentName(name);
      setNameValidation(queries.validateName(name));
    },
    [agentName, setAgentName]
  );
  const handleTypeChange = useCallback(
    event => {
      const type = event.target.value;
      setAgentType(type);
      setTypeValidation(queries.validateType(type));
    },
    [agentType, setAgentType]
  );
  const submit = useCallback(() => {
    if (idValidation && ipValidation && nameValidation && typeValidation) {
      addAgent(agentID, agentIP, agentName, agentType);
      setAgentID('');
      setAgentIP('');
      setAgentName('');
      setAgentType('');
    }
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
    idValidation,
    ipValidation,
    nameValidation,
    typeValidation,
  ]);

  const idInputClasses = classNames('tst-add-agent-id gc-input__field', {
    'gc-input__field--danger': idValidation === false,
    'gc-input__field--success': idValidation === true,
  });
  const idValidationMessage =
    idValidation !== false ? null : 'ID should be a number';

  const ipInputClasses = classNames('tst-add-agent-ip gc-input__field', {
    'gc-input__field--danger': ipValidation === false,
    'gc-input__field--success': ipValidation === true,
  });
  const ipValidationMessage =
    ipValidation !== false ? null : 'IP should be IP formatted address';

  const nameInputClasses = classNames('tst-add-agent-name gc-input__field', {
    'gc-input__field--danger': nameValidation === false,
    'gc-input__field--success': nameValidation === true,
  });
  const nameValidationMessage =
    nameValidation !== false ? null : 'Name should be text';

  const typeInputClasses = classNames('tst-add-agent-type gc-input__field', {
    'gc-input__field--danger': typeValidation === false,
    'gc-input__field--success': typeValidation === true,
  });
  const typeValidationMessage =
    typeValidation !== false ? null : 'Type should be text';

  const classes = classNames(
    'shp-admin__card gc-card gc-card--gradient gc-panel',
    className
  );

  return (
    <div className={classes}>
      <div className="gc-panel__title">Add agent</div>
      <div className="gc-panel__content">
        <Validation type="danger" message={idValidationMessage}>
          <div className="gc-input gc-input--full">
            <label htmlFor="add-agent-id" className="gc-input__label">
              ID
            </label>
            <input
              id="add-agent-id"
              className={idInputClasses}
              value={agentID}
              onChange={handleIDChange}
            />
          </div>
        </Validation>
        <Validation type="danger" message={ipValidationMessage}>
          <div className="gc-input gc-input--full">
            <label htmlFor="add-agent-ip" className="gc-input__label">
              IP
            </label>
            <input
              id="add-agent-ip"
              className={ipInputClasses}
              value={agentIP}
              onChange={handleIPChange}
            />
          </div>
        </Validation>
        <Validation type="danger" message={nameValidationMessage}>
          <div className="gc-input gc-input--full">
            <label htmlFor="add-agent-name" className="gc-input__label">
              Name
            </label>
            <input
              id="add-agent-name"
              className={nameInputClasses}
              value={agentName}
              onChange={handleNameChange}
            />
          </div>
        </Validation>
        <Validation type="danger" message={typeValidationMessage}>
          <div className="gc-input gc-input--full">
            <label htmlFor="add-agent-type" className="gc-input__label">
              Type
            </label>
            <input
              id="add-agent-type"
              className={typeInputClasses}
              value={agentType}
              onChange={handleTypeChange}
            />
          </div>
        </Validation>
      </div>
      <div className="gc-separator" />
      <div className="gc-panel__footer">
        <button
          className="tst-add-agent-submit gc-btn gc-btn--primary gc-btn--full"
          onClick={submit}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddAgent;
