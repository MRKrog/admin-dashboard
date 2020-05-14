import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import shortId from 'shortid';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 132,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Creditor = (props) => {
  const classes = useStyles();
  const [credits, setCredits] = useState('');

  const handleChange = (event) => {
    setCredits(event.target.value);
  };


  const handleSubmit = async () => {
    try {
      let transaction = {
        "credit_amount" : credits,
        "transaction_type" : "credit",
        "stripe_invoice_id" : shortId.generate(),
        "status" : "accepted"
      }

      let options = {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(transaction)
      }

      let url = `http://localhost:3005/api/v1/createTransaction/${props.id}`;
      const response = await fetch(url, options);
      if(!response.ok) {  }

    } catch(e) {
      console.log("Hey that post didnt work/", e);
  }
}

  // console.log("shortid", shortId.generate())
  return (
    <div className="Creditor">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Credit Amount</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={credits}
          onChange={handleChange}
        >
          <MenuItem value={1}>1 Credit</MenuItem>
          <MenuItem value={2}>2 Credit</MenuItem>
          <MenuItem value={3}>3 Credit</MenuItem>
          <MenuItem value={5}>5 Credit</MenuItem>
          <MenuItem value={10}>10 Credit</MenuItem>
        </Select>
      </FormControl>
      <div className="submit-button">
						<Button type="submit" variant="contained" onClick={handleSubmit}>Add Credit</Button>
				</div>
    </div>
  );
}

export default Creditor;
