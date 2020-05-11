import React, { useState } from 'react';
import AccountsTable from "../../containers/AccountsTable";
import AccountInfo from "../../containers/AccountInfo";

const AdminDashboard = () => {
  const [state, setState] = useState({
    accountInfoDrawer: false,
    id: undefined,
    uuid: undefined,
  });

  const toggleDrawer = (anchor, open, id, uuid) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setState({ ...state, [anchor]: open, id, uuid });
  };

  return (
    <div className="AdminDashboard">
      <AccountsTable toggleDrawer={toggleDrawer} />
      <AccountInfo toggleDrawer={toggleDrawer} state={state} />
    </div>
  )
}

export default AdminDashboard;
