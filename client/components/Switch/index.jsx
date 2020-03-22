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

  return (
    <label
      className={`gc-switch ${className}`}
      onClick={onToggle}
    >
      <input
        className="gc-switch__input"
        type="checkbox"
        checked={isOn}
        onChange={_.noop}
      />
      <span className="gc-switch__slider" />
    </label>
  );
};

Switch.defaultProps = {
  isOn: false,
  onToggle: _.noop,
};

export default Switch;
