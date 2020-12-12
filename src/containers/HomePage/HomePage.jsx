import React, { useState, useCallback } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Fade
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import styles from './styles.module.scss';

const HomePage = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();
  const redirect = useCallback(route => () => {
    history.push(route);
  }, []);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={styles.homeWrapper}>
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
              <MenuItem onClick={redirect('profile')}>Profile</MenuItem>
              <MenuItem onClick={redirect('events')}>Events</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </IconButton>

          <Typography variant="h6" className={styles.headerTitle}>
            Partynder
          </Typography>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Box className={styles.homeContentWrapper}>
        <Fade in timeout={{ enter: 500 }}>
          <Typography variant="h4" className={styles.mainHeading}>
            Welcome to Partynder!
          </Typography>
        </Fade>
      </Box>

      <Box className={styles.browseWrapper} onClick={redirect('events')}>
        <Typography variant="h6">
          Browse events near you
        </Typography>
        <ArrowForwardIcon className={styles.browseIcon} />
      </Box>
    </Box>
  );
};

export default HomePage;
