import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import AccountsTable from "../../containers/AccountsTable";
import AccountInfo from "../../containers/AccountInfo";

const Home = () => {
  const [state, setState] = React.useState({
    accountInfo: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setState({ ...state, [anchor]: open });
  };

  return (
    <div className="Home">
      <section className="AccountsTable">
        <AccountsTable toggleDrawer={toggleDrawer} />
      </section>
      <AccountInfo toggleDrawer={toggleDrawer} state={state} />
    </div>
  )
}

export default Home;
