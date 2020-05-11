import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles({
  fullList: {
    width: 'auto',
    padding: '1em',
  },
});

const AccountInfo = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    email: '',
    first_name: '',
  });
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState([])

 useEffect(() => {
    if(props.state.accountInfoDrawer) {
      // setLoading(true);
      async function fetchData() {
        let url = `http://localhost:3005/api/v1/findAllUserData/${props.state.id}/${props.state.uuid}`;
        const response = await fetch(url);
        const data = await response.json();
        setUser(data);
        setLoading(false);
      }
      fetchData();
    }
  }, [props]);

  const handleSave = () => {
    console.log('saving');
  }

  const handleClose = () => {

  }

  console.log('loaded');

  return (
    <div>
      <Drawer anchor={'bottom'} open={props.state['accountInfoDrawer']} onClose={props.toggleDrawer('accountInfoDrawer', false)}>
        { loading ? (
          <h1>Loading.....</h1>
        ) : (
          <div className={classes.fullList} role="presentation">
            <section>
              <h1>User Account</h1>

              <br />
              <br />
              <button onClick={handleSave}>Save</button>
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
