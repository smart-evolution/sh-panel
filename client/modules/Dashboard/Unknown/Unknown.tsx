import React from 'react';

type Props = {
  pathname: string,
};

const Unknown = (props: Props) => {
  const { pathname } = props;

  return (
    <>
      <div className="dashboard__cell dashboard__cell--full">
        <div className="gc-panel gc-panel--separator">
          <div className="gc-panel__content">
            <a
              className="tst-edit-btn gc-btn gc-btn--primary"
              href={`${pathname}/edit`}
            >
              Edit
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unknown;
