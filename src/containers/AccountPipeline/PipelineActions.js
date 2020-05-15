import React, { useState } from 'react';
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
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// const PipelineActions = ({asset_hash, asset_stage, asset_completion_timestamp }) => {



const PipelineActions = (props) => {
  const classes = useStyles();
  const [asset_completion_timestamp, setAsset_completion_timestamp] = useState('');
  const [asset_stage, setAsset_stage] = useState('');
  const [asset_hash, setAsset_hash] = useState('');
  
  
  const handleChange = (event) => {
    // console.log("Before", asset_stage, asset_completion_timestamp, asset_hash)
    setAsset_completion_timestamp(event.target.value)
    setAsset_stage(event.target.value)
    setAsset_hash(event.target.value)
    // setState({ ...state, [name]: value });
  };

  const handleSubmit = () => {
    try {
      let updateData = {
        asset_completion_timestamp : asset_completion_timestamp,
        asset_stage : asset_stage,
        asset_hash : asset_hash,
        status : "BigData"
      }
      console.log(updateData)

    } catch(e) {
      console.log("Hey that post didnt work/", e);
    }
  }

  // console.log(asset_hash)
  
  // console.log(asset_completion_timestamp)
  return(
    <div className="PipelineActions" >
      <div className="PipelineForm">
      <section>
        <TextField
              id="standard-basic"
              variant="outlined"
              label="ETA / Notes"
              margin="dense"
              type="text"
              name="asset_completion_timestamp"
              className='User-Field'
              value={asset_completion_timestamp}
              onChange={handleChange}
              />
      </section>
      <section>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Asset Stage</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="asset_stage"
              value={asset_stage}
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
                id="standard-basic"
                variant="outlined"
                label="Hash"
                margin="dense"
                type="text"
                name="asset_hash"
                className='User-Field'
                value={asset_hash}
                onChange={handleChange}
                />
      </section>
      <div className="submit-button">
        <Button type="submit" variant="contained" onClick={handleSubmit}>Set Stage</Button>
      </div>
      </div>
    </div>
  )
}


export default PipelineActions;

// Fields
// State
// Button


/// {row._source.asset_completion_timestamp} || {row._source.asset_stage} || {row._source.asset_hash} || Save