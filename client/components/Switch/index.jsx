// @flow
import _ from 'lodash';
import React from 'react';

type Props = {
  isOn: boolean,
  onToggle: () => void,
  className: string,
};

const Switch = (props: Props) => {
  const { isOn, onToggle, className } = props;

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  return (
    <label
      htmlFor="send-alert-switch"
      role="button"
      className={`gc-switch ${className}`}
      onClick={onToggle}
    >
      <input
        id="send-alert-switch"
        className="gc-switch__input"
        type="checkbox"
        checked={isOn}
        onChange={_.noop}
      />
      <span className="gc-switch__slider" />
    </label>
  );
  /* eslint-enable jsx-a11y/no-static-element-interactions */
};

Switch.defaultProps = {
  isOn: false,
  onToggle: _.noop,
};

export default Switch;
