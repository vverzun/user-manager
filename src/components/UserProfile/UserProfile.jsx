import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Box, Button, Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { openModalAction } from '../../store/actions';
import user from '../../assets/images/user.png';
import style from './style.module.scss';
import userData from '../../mockData/userProfile';
import Layout from '../../containers/Layout/Layout';
import BackButton from '../common/BackButton/BackButton';

const UserProfile = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const redirect = useCallback(route => () => {
    history.push(route);
  }, []);

  const handleModalOpen = useCallback(() => {
    dispatch(openModalAction());
  }, []);

  const { firstName, lastName, eventsVisited, eventsCreated } = userData;

  return (
    <Layout>
      <BackButton />

      <Box className={style.container}>
        <Box className={style.header}>
          <picture>
            <img src={user} alt="user icon" />
          </picture>
          <Typography>
            {firstName}
            {' '}
            {lastName}
          </Typography>
        </Box>
        <Divider />

        <Box className={style.infoWrapper}>
          <Typography>
            Events visited:
            {' '}
            {eventsVisited}
          </Typography>
          <Typography>
            Events created:
            {' '}
            {eventsCreated}
          </Typography>
        </Box>
        <Divider />

        <Box className={style.myEventsWrapper} onClick={redirect('/userEvents')}>
          <Typography variant="h6">
            My events
          </Typography>
          <ArrowForwardIcon className={style.myEventsIcon} />
        </Box>

        <Box className={style.eventButtonWrapper}>
          <Button
            variant="contained"
            onClick={handleModalOpen}
          >
            Add new Event
          </Button>
        </Box>

      </Box>
    </Layout>
  );
};

export default UserProfile;
