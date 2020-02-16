// @flow
import React from 'react';
import { withRouter } from 'react-router';
import * as agentsConstants from 'client/models/agents/constants';
import * as agentTypes from 'client/models/agents/types';
import * as agentQueries from 'client/models/agents/queries';
import * as agentConfigTypes from 'client/models/agentConfigs/types';

type Props = {|
  agent: agentTypes.Agent,
  agentConfig: agentConfigTypes.AgentConfig,
  commitConfig: (agentTypes.AgentID, agentConfigTypes.AgentConfig) => void,
  updateProperty: (agentTypes.AgentID, string, string) => void,
  removeAgent: agentTypes.AgentID => void,
|};

class AgentEdit extends React.Component<Props> {
  constructor(props) {
    super(props);
    (this: any).updateTemperature = this.updateTemperature.bind(this);
    (this: any).updateName = this.updateName.bind(this);
    (this: any).updateConfig = this.updateConfig.bind(this);
    (this: any).removeAgent = this.removeAgent.bind(this);
  }

  updateConfig() {
    const { agent, agentConfig, commitConfig } = this.props;
    commitConfig(agent.id, agentConfig);
  }

  updateTemperature(e) {
    const value = e.target.value;
    const { agent, updateProperty } = this.props;
    updateProperty(agent.id, 'temperature', value);
  }

  updateName(e) {
    const value = e.target.value;
    const { agent, updateProperty } = this.props;
    updateProperty(agent.id, 'name', value);
  }

  removeAgent() {
    const { agent, removeAgent } = this.props;
    removeAgent(agent.id);
  }

  render() {
    const { agentConfig, agent } = this.props;

    const rawType = agentQueries.getNoVersionedType(agent);

    const temperatureAdjustment = (
      <div className="gc-input gc-input__full">
        <div className="gc-input__label">Temperature modifier</div>
        <input
          className="gc-input__field"
          value={agentConfig.temperature || ''}
          onChange={this.updateTemperature}
        />
      </div>
    );

    return (
      <div>
        <div className="gc-input gc-input__full">
          <div className="gc-input__label">Name</div>
          <input
            className="gc-input__field"
            value={agentConfig.name || ''}
            onChange={this.updateName}
          />
        </div>
        {rawType === agentsConstants.Type1 && temperatureAdjustment}
        <button
          className="gc-btn gc-btn--full gc-btn--success"
          onClick={this.updateConfig}
        >
          UPDATE
        </button>
        <button
          className="tst-delete gc-btn gc-btn--full gc-btn--danger"
          onClick={this.removeAgent}
        >
          DELETE
        </button>
      </div>
    );
  }
}

export default withRouter(AgentEdit);
