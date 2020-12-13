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
import PropTypes from 'prop-types';
import ErrorAlert from '../../components/ErrorAlert';
import styles from './styles.modules.scss';

const Layout = ({ children }) => {
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

          <Typography variant="h6" className={styles.headerTitle}>
            Partynder
          </Typography>
          <Button color="inherit" onClick={handleLoginRedirect}>Login</Button>
        </Toolbar>
      </AppBar>
      {children}
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
