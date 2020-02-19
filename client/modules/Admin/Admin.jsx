// @flow
import React from 'react';
import AddAgent from './AddAgent';
import Sniffer from './Sniffer';
import Alerts from './Alerts';

const Admin = () => {
  return (
    <div className="shp-admin gc-panel gc-panel--separator">
      <div className="gc-cards">
        <div className="shp-admin__card gc-card gc-card--default">
          <Sniffer />
        </div>
        <div className="shp-admin__card gc-card gc-card--default">
          <Alerts />
        </div>
      </div>
      <div className="gc-cards">
        <div className="shp-admin__card gc-card gc-card--default">
          <AddAgent />
        </div>
      </div>
    </div>
  );
};

export default Admin;
