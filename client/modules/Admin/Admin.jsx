// @flow
import React from 'react';
import AddAgent from './AddAgent';
import Sniffer from './Sniffer';
import Alerts from './Alerts';

const Admin = () => {
  return (
    <div className="admin">
      <div className="gc-cards">
        <AddAgent />
        <Sniffer />
        <Alerts />
      </div>
    </div>
  );
};

export default Admin;
