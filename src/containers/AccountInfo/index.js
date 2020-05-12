import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PageLoader from '../../components/PageLoader';

const useStyles = makeStyles({
  fullList: {
    width: 'auto',
    padding: '1em',
  },
  adminform: {
    display: 'flex',

  }
});

const initialState = {
    email: '',
    first_name: '',
    last_name: '',
    address: '',
    business_name: '',
    city: '',
    country: '',
    state: '',
    phone_number: '',
    zip: '',
};

const AccountInfo = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    email: '',
    first_name: '',
    last_name: '',
    address: '',
    business_name: '',
    city: '',
    country: '',
    state: '',
    phone_number: '',
    zip: '',
  });
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState([])


  async function fetchUser() {
    if(props.state.accountInfoDrawer) {
      setLoading(true);

      let url = `http://localhost:3005/api/v1/findAllUserData/${props.state.id}/${props.state.uuid}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setState({
        email: data.userInfo.email,
        business_name: data.userInfo.business_name || '',
        first_name: data.userInfo.first_name || '',
        last_name: data.userInfo.last_name || '',
        address: data.userInfo.address || '',
        city: data.userInfo.city || '',
        country: data.userInfo.country || '',
        state: data.userInfo.state || '',
        phone_number: data.userInfo.phone_number || '',
        zip: data.userInfo.zip || '',
      })

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
    return () => {
      // setState({ ...initialState });
    }
  }, [props]);


  const handleSave = () => {
    console.log('saving');
  }

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <Drawer anchor={'bottom'}
              open={props.state['accountInfoDrawer']}
              onClose={props.toggleDrawer('accountInfoDrawer', false)}
              >
        { loading ? (
          <PageLoader />
        ) : (
          <div className={classes.fullList} role="presentation">
            <h1>User Account - {state.email}</h1>
            <section className="Admin-Info">

              <form className="Admin-Form-Info">
                <div className="User-Info-Form">
                    <TextField
                      id="standard-basic-business_name"
                      label="Business Name"
                      margin="dense"
                      type="text"
                      name="business_name"
                      value={state.business_name}
                      onChange={onChange}
                    />
                    <TextField
                      id="standard-basic-first-name"
                      label="First Name"
                      margin="dense"
                      type="text"
                      name="first_name"
                      value={state.first_name}
                      onChange={onChange}
                    />
                    <TextField
                      id="standard-basic-last-name"
                      label="Last Name"
                      margin="dense"
                      type="text"
                      name="last_name"
                      value={state.last_name}
                      onChange={onChange}
                    />
                    <TextField
                      id="standard-basic-address"
                      label="Address"
                      margin="dense"
                      type="text"
                      name="address"
                      value={state.address}
                      onChange={onChange}
                    />
                    <TextField
                      id="standard-basic-city"
                      label="City"
                      margin="dense"
                      type="text"
                      name="city"
                      value={state.city}
                      onChange={onChange}
                    />
                    <TextField
                      id="standard-basic-country"
                      label="Country"
                      margin="dense"
                      type="text"
                      name="country"
                      value={state.country}
                      onChange={onChange}
                    />
                    <TextField
                      id="standard-basic-state"
                      label="State"
                      margin="dense"
                      type="text"
                      name="state"
                      value={state.state}
                      onChange={onChange}
                    />
                    <TextField
                      id="standard-basic-phone_number"
                      label="Phone Number"
                      margin="dense"
                      type="text"
                      name="phone_number"
                      value={state.phone_number}
                      onChange={onChange}
                    />
                    <TextField
                      id="standard-basic-zip"
                      label="Zip"
                      margin="dense"
                      type="text"
                      name="zip"
                      value={state.zip}
                      onChange={onChange}
                    />
                </div>
                <div className="submit-button">
                  <Button type="submit" variant="contained" onClick={handleSave}>Save</Button>
                </div>
              </form>

              <form className="Admin-Credit-Info">
                <h2>credits</h2>
              </form>

            </section>
          </div>
        ) }
      </Drawer>
    </div>
  );
}

export default AccountInfo;


// data >>
// productCount: 395
// userInfo: {id: 45, uuid: "2e5da892-af38-4fd2-b8b2-3caeeffdbeb2", email: "irios@bestias.cl", accepts_marketing: null, first_name: null, …}
// userIntegration: {id: 55, levar_user_id: 45, integration_id: 1}
// userStore: {id: 62, store_url: "bestiaschile.myshopify.com", shopify_store_id: "1187840066", shopify_access_token: "e424e8c411f4e56932d486bd5939fbb3", access_token_experation: 1582039239, …}
// userTransactions: []
// variantCount: 1728


// userInfo >>>

// accepts_marketing: null
// address: "222 Street St."
// business_name: "Dan Test"
// city: "Chicago"
// country: "United States"
// created_at: "2020-04-05T15:59:49.000Z"
// email: "desrig+test@gmail.com"
// first_name: null
// id: 11
// last_name: null
// phone_number: "8473335555"
// setup_wizard_state: 5
// state: "Illinois"
// stripe_id: null
// user_shopify_url: null
// uuid: "56c8f98b-e849-43d0-89f6-72d2b6dcc168"
// website_url: "test.com"
// zip: "60602"



// const { useState } = React;
//
// function signupUser() {
//   return new Promise(resolve => {
//     setTimeout(resolve, 1000);
//   });
// }
//
// const initialState = {
//   username: "",
//   email: "",
//   password: "",
//   passwordConfirmation: ""
// };
//
// const Signup = () => {
//   const [
//     { username, email, password, passwordConfirmation },
//     setState
//   ] = useState(initialState);
//
//   const clearState = () => {
//     setState({ ...initialState });
//   };
//
//   const onChange = e => {
//     const { name, value } = e.target;
//     setState(prevState => ({ ...prevState, [name]: value }));
//   };
//
//   const handleSubmit = e => {
//     e.preventDefault();
//     signupUser().then(clearState);
//   };
//
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>
//           Username:
//           <input value={username} name="username" onChange={onChange} />
//         </label>
//       </div>
//       <div>
//         <label>
//           Email:
//           <input value={email} name="email" onChange={onChange} />
//         </label>
//       </div>
//       <div>
//         <label>
//           Password:
//           <input
//             value={password}
//             name="password"
//             type="password"
//             onChange={onChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Confirm Password:
//           <input
//             value={passwordConfirmation}
//             name="passwordConfirmation"
//             type="password"
//             onChange={onChange}
//           />
//         </label>
//       </div>
//       <button>Submit</button>
//     </form>
//   );
// };
