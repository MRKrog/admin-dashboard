import React, { useState } from 'react';
import AccountsTable from "../../containers/AccountsTable";
import AccountInfo from "../../containers/AccountInfo";
import AccountPipeline from "../../containers/AccountPipeline";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const AdminDashboard = () => {
  const [state, setState] = useState({
    accountInfoDrawer: false,
    accountPipelineDrawer: false,
    id: undefined,
    uuid: undefined,
  });
  const classes = useStyles();

  const toggleDrawer = (drawer, open, id, uuid) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setState({ ...state, [drawer]: open, id, uuid });
  };

  const closeDrawer = (drawer, open) => {
    setState({ ...state, [drawer]: open });
  }

  return (
    <div className="AdminDashboard">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AccountsTable toggleDrawer={toggleDrawer} />
            { state.accountInfoDrawer && <AccountInfo toggleDrawer={toggleDrawer} closeDrawer={closeDrawer} state={state} /> }
            { state.accountPipelineDrawer && <AccountPipeline toggleDrawer={toggleDrawer} closeDrawer={closeDrawer} state={state} /> }
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default AdminDashboard;
