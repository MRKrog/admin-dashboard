import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import AccountsTable from "../../containers/AccountsTable";
import AccountInfo from "../../containers/AccountInfo";

const AdminDashboard = () => {
  const [state, setState] = useState({
    accountInfo: false,
  });

  const toggleDrawer = (anchor, open, id, uuid) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    console.log('id', id);
    console.log('uuid', uuid);
    setState({ ...state, [anchor]: open });
  };

  return (
    <div className="AdminDashboard">
      <section className="AccountsTable">
        <AccountsTable toggleDrawer={toggleDrawer} />
      </section>
      <AccountInfo toggleDrawer={toggleDrawer} state={state} />
    </div>
  )
}

export default AdminDashboard;
