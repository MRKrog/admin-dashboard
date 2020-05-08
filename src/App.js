import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "./redux/actions";

import routes from "./routes";
import { Switch, Redirect, Route } from "react-router-dom";


class App extends Component {
  constructor(){
    super();
    this.state = {}
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <div className="App-Content">
          <Switch>
          {
            routes.map((prop, key) => {
              if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key} />;
              return (
                <Route
                  path={prop.path}
                  key={key}
                  render={props => <prop.component {...props} />}
                />
              );
            })
          }
          </Switch>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
