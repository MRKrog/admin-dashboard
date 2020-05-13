import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PageLoader from '../../components/PageLoader';

import AdminInfo from '../../components/AdminInfo';
import AdminCredits from '../../components/AdminCredits';


const useStyles = makeStyles({
  fullList: {
    width: 'auto',
    padding: '1em',
  },
  adminform: {
    display: 'flex',

  }
});

const AccountInfo = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState([])


  async function fetchUser() {
    if(props.state.accountInfoDrawer) {
      setLoading(true);
      let url = `http://localhost:3005/api/v1/findAllUserData/${props.state.id}/${props.state.uuid}`;
      const response = await fetch(url);
      const data = await response.json();
      setUser(data)
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
    // return () => {
      // setState({ ...initialState });
    // }
  }, [props]);


  const handleSave = () => {
    console.log('saving');
  }

  const onChange = e => {
    const { name, value } = e.target;
    // setState(prevState => ({ ...prevState, [name]: value }));
  };

  console.log(user)

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
            <h1>User Account</h1>
            <section className="Admin-Info">
              { Object.keys(user).length > 0 && <AdminInfo userInfo={user.userInfo} /> }
              { Object.keys(user).length > 0 && <AdminCredits {...user} /> }
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
