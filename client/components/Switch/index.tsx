// @flow
import _ from 'lodash';
import React from 'react';

type Props = {
  isOn: boolean;
  onToggle: () => void;
  className: string;
};

const Switch = (props: Props) => {
  const { isOn, onToggle, className } = props;

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <label
        htmlFor="send-alert-switch"
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
    </>
  );
  /* eslint-enable jsx-a11y/no-static-element-interactions */
};

export default Switch;
