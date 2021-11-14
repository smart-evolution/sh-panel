export type AlertType = string;

export type Alert = {
  message: string;
  type: AlertType;
  timestamp: Date;
  isOld: boolean;
};

export type State = {
  alerts: Array<AlertType>;
};

export type Action = {
  message: string;
  type: string;
  alertType: string;
  timestamp: Date;
};
