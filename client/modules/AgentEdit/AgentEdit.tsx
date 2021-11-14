import React from 'react';
import { withRouter } from 'react-router';
import * as agentsConstants from 'client/models/agents/constants';
import type * as agentTypes from 'client/models/agents/types';
import * as agentQueries from 'client/models/agents/queries';
import type * as agentConfigTypes from 'client/models/agentConfigs/types';
import { Dialog, Button } from 'graphen';

type Props = {
  agent: agentTypes.Agent;
  agentConfig: agentConfigTypes.AgentConfig;
  commitConfig: (
    arg0: agentTypes.AgentID,
    arg1: agentConfigTypes.AgentConfig
  ) => void;
  updateProperty: (
    arg0: agentTypes.AgentID,
    arg1: string,
    arg2: string
  ) => void;
  removeAgent: (arg0: agentTypes.AgentID) => void;
};

type State = {
  isDialogShown: boolean;
};

class AgentEdit extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.updateTemperature = this.updateTemperature.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
    this.removeAgent = this.removeAgent.bind(this);
    this.handleDialogToggle = this.handleDialogToggle.bind(this);

    this.state = {
      isDialogShown: false,
    };
  }

  handleDialogToggle(isDialogShown: boolean) {
    this.setState({
      isDialogShown,
    });
  }

  updateConfig() {
    const { agent, agentConfig, commitConfig } = this.props;
    commitConfig(agent.id, agentConfig);
  }

  updateTemperature(e) {
    const { value } = e.target;
    const { agent, updateProperty } = this.props;
    updateProperty(agent.id, 'temperature', value);
  }

  updateName(e) {
    const { value } = e.target;
    const { agent, updateProperty } = this.props;
    updateProperty(agent.id, 'name', value);
  }

  removeAgent() {
    const { agent, removeAgent } = this.props;
    removeAgent(agent.id);
  }

  render() {
    const { isDialogShown } = this.state;
    const { agentConfig, agent } = this.props;

    const rawType = agentQueries.getNoVersionedType(agent);

    const temperatureAdjustment = (
      <div className="gc-input gc-input--full">
        <div className="gc-input__label">Temperature modifier</div>
        <input
          className="gc-input__field"
          value={agentConfig.temperature || ''}
          onChange={this.updateTemperature}
        />
      </div>
    );

    return (
      <div className="gc-panel gc-panel--separator">
        <div className="gc-flex">
          <div className="gc-flex__item gm-spacing-rl gc-card gc-card--gradient gc-panel">
            <div className="gc-panel__title">Adjustments</div>
            <div className="gc-panel__content">
              <p>Adjust agent with custom settings.</p>
              <div className="gc-input gc-input--full">
                <div className="gc-input__label">Name</div>
                <input
                  className="gc-input__field"
                  value={agentConfig.name || ''}
                  onChange={this.updateName}
                />
              </div>
              {rawType === agentsConstants.Type1 && temperatureAdjustment}
            </div>
            <div className="gc-panel__footer">
              <button
                type="button"
                className="gc-btn gc-btn--full gc-btn--primary"
                onClick={this.updateConfig}
              >
                Update
              </button>
            </div>
          </div>
          <div className="gc-flex__item gc-card gc-card--gradient gc-panel">
            <div className="gc-panel__title">Remove agent</div>
            <div className="gc-panel__content">Remove agent permanently.</div>
            <div className="gc-panel__footer">
              <button
                type="button"
                className="tst-delete gc-btn gc-btn--full gc-btn--primary"
                onClick={() => this.handleDialogToggle(true)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        {isDialogShown && (
          <Dialog>
            <article className="gc-panel">
              <header className="gc-panel__title">Remove confirmation</header>
              <div className="gc-panel__content">
                Are you sure you want to remove this agent?
              </div>
              <div className="gc-panel__footer">
                <Button
                  onClick={() => this.removeAgent()}
                  className="tst-delete-confirm gc-btn--danger"
                >
                  Delete
                </Button>{' '}
                <Button
                  onClick={() => this.handleDialogToggle(false)}
                  className="gc-btn--secondary"
                >
                  Cancel
                </Button>
              </div>
            </article>
          </Dialog>
        )}
      </div>
    );
  }
}

export default withRouter(AgentEdit);
