import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import PipelineTable from "./PipelineTable";

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

const AccountPipeline = (props) => {
  const classes = useStyles();
  const [pipeline, setPipeline] = useState([]);
  const dispatch = useDispatch();

  async function fetchPipeline() {
    dispatch(actions.setPageLoading(true));
    let url = `http://localhost:3005/api/v1/es/assetInfo/${props.state.uuid}`;
    const response = await fetch(url);
    const { result } = await response.json();
    setPipeline(result.hits.hits);
    dispatch(actions.setPageLoading(false));
  }

  useEffect(() => {
    fetchPipeline();
  }, []);

  return (
    <div className="AccountInfo">
      <Drawer anchor={'bottom'} open={props.state['accountPipelineDrawer']} onClose={props.toggleDrawer('accountPipelineDrawer', false)}>
        <div className={classes.fullList} role="presentation">
        {
          Object.keys(pipeline).length > 0 &&
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.accountHeader}>
              <div><b>Account Pipeline: </b></div>
              <button className="AdminCloseBtn" onClick={props.toggleDrawer('accountPipelineDrawer', false)}>
                <i className="fas fa-times-circle"></i>
              </button>
            </Grid>
            <Grid item xs={12}>
              <PipelineTable closeDrawer={props.closeDrawer} pipeline={pipeline}/>
            </Grid>
          </Grid>
        }
        </div>
      </Drawer>
    </div>
  );
}

export default AccountPipeline;
