import React, { useState, useCallback } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ErrorAlert from '../../components/ErrorAlert';
import style from './styles.modules.scss';
import { logout } from '../../store/actions';

const Layout = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const isLoggedIn = localStorage.getItem('jwtToken');

  const history = useHistory();
  const dispatch = useDispatch();

  const redirect = useCallback(route => () => {
    history.push(route);
  }, []);

  const handleLoginRedirect = () => {
    if (isLoggedIn) {
      dispatch(logout());
      history.push('/');
    } else {
      history.push('/login');
    }
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar className={style.toolbar}>

          <Box className={style.menu}>
            {isLoggedIn
            && (
              <>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MenuIcon className={style.icon} />
                </Button>

                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={redirect('/')}>Home</MenuItem>
                  <MenuItem onClick={redirect('/profile')}>Profile</MenuItem>
                  <MenuItem onClick={redirect('/events')}>Events</MenuItem>
                  <MenuItem onClick={redirect('/userEvents')}>Created Events</MenuItem>
                  <MenuItem onClick={redirect('/userGoingEvents')}>Scheduled Events</MenuItem>
                </Menu>
              </>
            )}

            <Typography variant="h6">
              Partynder
            </Typography>
          </Box>
          <Button color="inherit" onClick={handleLoginRedirect}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
      <Box>
        {children}
      </Box>
      <ErrorAlert />
    </Box>
  );
};

Layout.defaultProps = {
  children: []
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
