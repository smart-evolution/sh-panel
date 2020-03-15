// @flow
import React, { useState } from 'react';
import { Dialog, Button } from 'graphen';

type Props = {
  reset: () => void,
};

const Reset = (props: Props) => {
  const { reset } = props;
  const [ isDialogShown, setIsDialogShown ] = useState(false);

  return (
    <div className="shp-admin__card gc-card gc-card--default gc-panel">
      <div className="gc-panel__title">Reset platform</div>
      <div className="gc-panel__content">
        Restore whole platform to default.
      </div>
      <div className="gc-panel__footer">
        <Button
          className="gc-btn gc-btn--danger"
            onClick={() => setIsDialogShown(true)}
        >
          Reset
        </Button>
      </div>
      { isDialogShown && (
        <Dialog>
          <article className='gc-panel'>
            <header className='gc-panel__title'>
              Reset confirmation
            </header>
            <div  className='gc-panel__content'>
              Are you sure you want to restore default settings?
            </div>
            <div  className='gc-panel__footer'>
              <Button
                onClick={() => reset()}
                className='gc-btn--danger'
              >
                Restore
              </Button>{" "}
              <Button
                onClick={() => setIsDialogShown(false)}
                className='gc-btn--info'
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

export default Reset;
