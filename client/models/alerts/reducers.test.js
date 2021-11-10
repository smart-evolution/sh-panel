import reducers from './reducers';
import * as actions from './actions';
import * as constants from './constants';

describe('models/alerts/reducers', () => {
  describe('ADD', () => {
    it('should add new Alert to state in particular order', () => {
      const alertMessage = 'Error message';
      const infoMessage = (index) => `Info message ${index}`;
      const timestamp = new Date('2019-12-14T09:25:59.373Z');
      const state = {
        alerts: [],
      };

      const expectedAlerts = [
        {
          message: infoMessage(2),
          type: constants.ALERT_TYPE_INFO,
          timestamp,
          isOld: false,
        },
        {
          message: infoMessage(1),
          type: constants.ALERT_TYPE_INFO,
          timestamp,
          isOld: false,
        },
        {
          message: alertMessage,
          type: constants.ALERT_TYPE_ERROR,
          timestamp,
          isOld: false,
        },
      ];
      const expectedState = {
        alerts: expectedAlerts,
      };

      let action = actions.addAlert(
        alertMessage,
        constants.ALERT_TYPE_ERROR,
        timestamp
      );

      let result = reducers(state, action);

      action = actions.addAlert(
        infoMessage(1),
        constants.ALERT_TYPE_INFO,
        timestamp
      );
      result = reducers(result, action);

      action = actions.addAlert(
        infoMessage(2),
        constants.ALERT_TYPE_INFO,
        timestamp
      );
      result = reducers(result, action);

      expect(result).toEqual(expectedState);
    });

    it('should remove alerts which went over the limit', () => {
      const alertMessage = 'Error message';
      const infoMessage = 'Info message';
      const timestamp = new Date('2019-12-14T09:25:59.373Z');
      let action;
      let state = {
        alerts: [],
      };

      for (let i = 0; i < constants.ALERT_LIMIT * 2; i += 1) {
        const type =
          i % 2 ? constants.ALERT_TYPE_ERROR : constants.ALERT_TYPE_INFO;
        const message = i % 2 ? alertMessage : infoMessage;

        action = actions.addAlert(message, type, timestamp);
        state = reducers(state, action);
      }

      expect(state.alerts.length).toEqual(constants.ALERT_LIMIT);
    });
  });
});
