import React, { useCallback } from 'react';
import {
  Box,
  Typography,
  Fade
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Layout from '../Layout/Layout';

import style from './styles.module.scss';

const HomePage = () => {
  const history = useHistory();
  const redirect = useCallback(route => () => {
    history.push(route);
  }, []);

  return (
    <Layout>
      <Box className={style.homeWrapper}>
        <Box className={style.homeContentWrapper}>
          <Fade in timeout={{ enter: 500 }}>
            <Typography variant="h4" className={style.mainHeading}>
              Welcome to Partynder!
            </Typography>
          </Fade>
        </Box>

        <Fade in timeout={{ enter: 500 }}>
          <Box className={style.browseWrapper} onClick={redirect('/events')}>
            <Typography variant="h6">
              Browse events near you
            </Typography>
            <ArrowForwardIcon className={style.browseIcon} />
          </Box>
        </Fade>

        <Fade in timeout={{ enter: 500 }}>
          <Box className={style.browseWrapper} onClick={redirect('/swipeCards')}>
            <Typography variant="h6">
              PARTYNDER!
            </Typography>
          </Box>
        </Fade>
      </Box>
    </Layout>
  );
};

export default HomePage;
