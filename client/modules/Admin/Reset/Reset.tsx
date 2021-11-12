import classNames from 'classnames';
import React, { useState } from 'react';
import { Dialog, Button } from 'graphen';

type Props = {
  className?: string,
  reset: () => void,
};

const Reset = (props: Props) => {
  const { reset, className } = props;
  const [isDialogShown, setIsDialogShown] = useState(false);
  const classes = classNames(
    'shp-admin__card gc-card gc-card--gradient gc-panel',
    className
  );

  return (
    <div className={classes}>
      <div className="gc-panel__title">Reset platform</div>
      <div className="gc-panel__content">
        Restore whole platform to default.
      </div>
      <div className="gc-panel__footer">
        <Button
          className="gc-btn gc-btn--primary"
          onClick={() => setIsDialogShown(true)}
        >
          Reset
        </Button>
      </div>
      {isDialogShown && (
        <Dialog>
          <article className="gc-panel">
            <header className="gc-panel__title">Reset confirmation</header>
            <div className="gc-panel__content">
              Are you sure you want to restore default settings?
            </div>
            <div className="gc-separator" />
            <div className="gc-panel__footer">
              <Button onClick={() => reset()} className="gc-btn--danger">
                Restore
              </Button>{' '}
              <Button
                onClick={() => setIsDialogShown(false)}
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
};

Reset.defaultProps = {
    className: '',
};

export default Reset;
