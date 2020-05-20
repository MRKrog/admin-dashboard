import React from 'react';
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const ConfirmDialog = (props) => {

  const dispatch = useDispatch();

  const handleSubmit = async () => {

    dispatch(actions.setPageLoading(true));
    try {
      const url = `http://localhost:3005/api/v1/masterDelete/${props.id}/${props.uuid}`
      const response = await fetch(url, {method: 'DELETE'})
      const data = await response.json()
      console.log("It Worked", data)
      dispatch(actions.setUserAccountDelete({ id: props.id }));
    } catch(e) {
      console.log(e)
    }
    props.handleDialogClose()
    dispatch(actions.setPageLoading(false));
  };

  return (
    <div>
      <Dialog
        open={props.status}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Are you really sure you want to delete this user?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This is a permanent delete from all RDS tables, Elastic Search and Cognito!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleDialogClose} color="primary">
            Exit
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDialog;
