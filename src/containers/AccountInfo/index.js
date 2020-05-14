import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import InfoContainer from './InfoContainer';
import CreditContainer from './CreditContainer';

const useStyles = makeStyles({
  fullList: {
    width: 'auto',
    padding: '1em 1em 2em 1em;',
  },
  accountHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: 'solid 1px #cccccc',
    marginBottom: '1em',
  }
});

const AccountInfo = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();

  async function fetchUser() {
    dispatch(actions.setPageLoading(true));
    let url = `http://localhost:3005/api/v1/findAllUserData/${props.state.id}/${props.state.uuid}`;
    const response = await fetch(url);
    const data = await response.json();
    setUser(data);
    dispatch(actions.setPageLoading(false));
  }

  useEffect(() => {
    fetchUser();
  }, []);

console.log(user);
  return (
    <div className="AccountInfo">
      <Drawer anchor={'bottom'} open={props.state['accountInfoDrawer']} onClose={props.toggleDrawer('accountInfoDrawer', false)}>
        <div className={classes.fullList} role="presentation">
        { Object.keys(user).length > 0 &&
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.accountHeader}>
              <div><b>Account Info: {user.userInfo.email}</b></div>
              <button className="AdminCloseBtn" onClick={props.toggleDrawer('accountInfoDrawer', false)}>
                <i className="fas fa-times-circle"></i>
              </button>
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoContainer toggleDrawer={props.toggleDrawer} {...user} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CreditContainer toggleDrawer={props.toggleDrawer} {...user} />
            </Grid>
          </Grid> }
        </div>
      </Drawer>
    </div>
  );
}

export default AccountInfo;
