import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "./redux/actions";
import AdminDashboard from './views/AdminDashboard';


class App extends Component {
  constructor(){
    super();
    this.state = {}
  }

  async componentDidMount() {
    await this.fetchData()
  }

  fetchData = async () => {
    let url = 'http://localhost:3005/api/v1/findAllUsers';
    const response = await fetch(url);
    const { data } = await response.json();
    this.props.setUserAccounts(data);
  }

  render() {
    return (
      <div className="App">
        <div className="App-Content">
          <AdminDashboard />
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  loading: state.loading,
  error: state.error,
});

export const mapDispatchToProps = dispatch => ({
  setLoading: data => dispatch(actions.setLoading(data)),
  setError: data => dispatch(actions.setError(data)),
  setUserAccounts: data => dispatch(actions.setUserAccounts(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
