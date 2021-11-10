import React from 'react';
import AddAgent from './AddAgent';
import Sniffer from './Sniffer';
import Alerts from './Alerts';
import Reset from './Reset';

const Admin = () => (
    <div className="shp-admin gc-panel gc-panel--separator">
      <div className="gc-flex gm-spacing-bl">
        <Sniffer className="gc-flex__item gm-spacing-rl" />
        <Alerts className="gc-flex__item" />
      </div>
      <div className="gc-flex gm-spacing-bl">
        <AddAgent className="gc-flex__item gm-spacing-rl" />
        <Reset className="gc-flex__item" />
      </div>
    </div>
  );

export default Admin;
