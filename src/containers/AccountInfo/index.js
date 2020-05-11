import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  fullList: {
    width: 'auto',
  },
});

const AccountInfo = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState(null)

 useEffect(() => {
    async function fetchData() {
      console.log(props);
      let url = 'http://localhost:3005/api/v1/findAllUserData';
      let options = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ levar_user_id: props.id, uuid: props.uuid }),
      };
      const response = await fetch(url, options);
      // const data = await response.json();
      // console.log('data', data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Drawer anchor={'bottom'} open={props.state['accountInfoDrawer']} onClose={props.toggleDrawer('accountInfoDrawer', false)}>
        <div
          className={classes.fullList}
          role="presentation"
          onClick={props.toggleDrawer('accountInfoDrawer', false)}
          onKeyDown={props.toggleDrawer('accountInfoDrawer', false)}
        >
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default AccountInfo;
