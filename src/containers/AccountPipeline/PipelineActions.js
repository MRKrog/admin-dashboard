import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 132,
    '& > label + .MuiInput-formControl': {
      marginTop: '13px',
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  pipelineForm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  UserField: {

  },
}));

const PipelineActions = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    asset_completion_timestamp: '',
    asset_stage: '',
    asset_hash: '',
  });

  useEffect(() => {
   setState({
     asset_completion_timestamp : props.asset_completion_timestamp || '',
     asset_stage: props.asset_stage || '',
     asset_hash: props.asset_hash || '',
   });
  }, [props])

  const handleChange = (event) => {
    const { value, name } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async () => {
    try {

      let updateData = {
        asset_completion_timestamp: state.asset_completion_timestamp,
        asset_stage: state.asset_stage,
        asset_hash: state.asset_hash,
        variant_id: props.id
      }

      console.log(updateData)
    } catch(e) {
      console.log("Hey that post didnt work/", e);
    }
    props.closeDrawer('accountPipelineDrawer', false)
  }

  return(
    <div className="PipelineActions" >
      <div className={classes.pipelineForm}>
        <section>
          <TextField
            id={`standard-basic-time-${props.id}`}
            variant="outlined"
            label="ETA / Notes"
            margin="dense"
            type="text"
            name="asset_completion_timestamp"
            className='User-Field'
            value={state.asset_completion_timestamp}
            onChange={handleChange}
          />
        </section>
        <section>
          <FormControl className={classes.formControl}>
            <InputLabel id={`demo-simple-select-label-${props.id}`}>Asset Stage</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id={`demo-simple-select-${props.id}`}
              name="asset_stage"
              value={state.asset_stage}
              onChange={handleChange}
            >
              <MenuItem value={1}>Stage 1</MenuItem>
              <MenuItem value={2}>Stage 2</MenuItem>
              <MenuItem value={3}>Stage 3</MenuItem>
              <MenuItem value={4}>Stage 4</MenuItem>
              <MenuItem value={5}>Stage 5</MenuItem>
            </Select>
          </FormControl>
        </section>
        <section>
          <TextField
            id={`standard-basic-hash-${props.id}`}
            variant="outlined"
            label="Hash"
            margin="dense"
            type="text"
            name="asset_hash"
            disabled={state.asset_hash.length > 0 ? true : false}
            className={classes.UserField}
            value={state.asset_hash}
            onChange={handleChange}
          />
        </section>
        <div className="submit-button">
          <Button type="submit" variant="contained" onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default PipelineActions;
