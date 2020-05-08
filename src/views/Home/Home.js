import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import AccountsTable from "../../containers/AccountsTable";


const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      let url = 'http://localhost:3000/api/v1/user';
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      dispatch(actions.setUserAccounts(data));
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  return (
    <div className="Home">
      <section className="AccountsTable">
        <AccountsTable />
      </section>
    </div>
  )
}

export default Home;
