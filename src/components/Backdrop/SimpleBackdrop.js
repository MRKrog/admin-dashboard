import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: 1350,
    color: '#fff',
  },
}));

const SimpleBackdrop = () => {
  const classes = useStyles();
  const pageLoading = useSelector(state => state.pageLoading);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(pageLoading)
  }, [pageLoading])

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default SimpleBackdrop;
