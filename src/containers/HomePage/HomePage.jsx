import React, { useCallback } from 'react';
import {
  Box,
  Typography,
  Fade
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Layout from '../Layout/Layout';

import styles from './styles.module.scss';

const HomePage = () => {
  const history = useHistory();
  const redirect = useCallback(route => () => {
    history.push(route);
  }, []);

  return (
    <Layout>
      <Box className={styles.homeWrapper}>
        <Box className={styles.homeContentWrapper}>
          <Fade in timeout={{ enter: 500 }}>
            <Typography variant="h4" className={styles.mainHeading}>
              Welcome to Partynder!
            </Typography>
          </Fade>
        </Box>

        <Box className={styles.browseWrapper} onClick={redirect('/events')}>
          <Typography variant="h6">
            Browse events near you
          </Typography>
          <ArrowForwardIcon className={styles.browseIcon} />
        </Box>
      </Box>
    </Layout>
  );
};

export default HomePage;
