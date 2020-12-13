import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../../components/Spinner';
import ErrorAlert from '../../components/ErrorAlert';
import styles from './styles.modules.scss';

const Layout = ({ children }) => {
  const isLoading = useSelector(state => state.isLoading);
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();
  const redirect = useCallback(route => () => {
    history.push(route);
  }, []);

  const handleLoginRedirect = () => {
    history.push('/login');
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={styles.layout}>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              className={styles.menuButton}
            >
              <MenuIcon className={styles.menuIcon} />
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
              <MenuItem>Logout</MenuItem>
            </Menu>
          </IconButton>

          <Typography variant="h6" className={styles.headerTitle}>
            Partynder
          </Typography>

          <Button color="inherit" onClick={handleLoginRedirect}>Login</Button>
        </Toolbar>
      </AppBar>
      {isLoading
        ? <Spinner />
        : children}
      <ErrorAlert />
    </Box>
  );
};

Layout.defaultProps = {
  children: []
};

Layout.propTypes = {
  children: PropTypes.object
};

export default Layout;
