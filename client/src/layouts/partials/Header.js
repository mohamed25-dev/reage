import {
  makeStyles,
  Avatar,
  Menu,
  MenuItem,
  Link,
  Box
} from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Auth from '../../Auth';

import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    cursor: 'pointer',
    textAlign: 'right'
  },
  button: {
    marginLeft: 2
  }
}));

export default function Header() {
  const classes = useStyles();
  const user = Auth.getUser();

  return (
    <AppBar position="static" sx={{ background: 'white' }}>
      <Toolbar>
        <Typography variant="h6" component="div" className={classes.title}>
          <FormattedMessage id='app.name' />
        </Typography>

        {
          user ? <UserMenu user={user} logout={Auth.logout} /> : <GuestMenu />
        }
      </Toolbar>
    </AppBar>
  )
}

function GuestMenu() {
  return (
    <Button href='/login' color="inherit" variant="outlined">
      <FormattedMessage id={'header.login'} />
    </Button>
  )
}

function UserMenu({ user, logout }) {
  const [menu, setMenu] = useState(null);
  const handleMenu = (event) => setMenu(event.currentTarget);
  const handleClose = () => setMenu(null);

  const handleLogout = async () => {
    setMenu(null);
    await logout();
    window.location.reload();
  }

  return (
    <>
      <Button variant="outlined" color='secondary' href='/upload'>
        Upload
      </Button>
      
      <Box sx={{ flexGrow: 1 }} />
      <div>
        {user?.name}
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar>{user.name?.charAt(0)}</Avatar>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={menu}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          open={Boolean(menu)}
          onClose={handleClose}
        >
          <Link href='/profile'>
            <MenuItem>
              <FormattedMessage id='header.profile' />
            </MenuItem>
          </Link>
          <MenuItem onClick={handleLogout}>
            <FormattedMessage id='header.logout' />
          </MenuItem>
        </Menu>
      </div>
    </>
  )
}