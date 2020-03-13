// @flow
import React from 'react';
import AddAgent from './AddAgent';
import Sniffer from './Sniffer';
import Alerts from './Alerts';
import Reset from './Reset';

const Admin = () => {
  return (
    <div className="shp-admin gc-panel gc-panel--separator">
      <div className="gc-cards">
        <Sniffer />
        <Alerts />
      </div>
      <div className="gc-cards">
        <AddAgent />
        <Reset />
      </div>
    </div>
  );
};

export default Admin;
