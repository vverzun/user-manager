import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Button, Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { openModalAction, loadUser } from '../../store/actions';
import ProfilePhoto from '../../assets/images/profile-photo.png';
import style from './style.module.scss';
import Layout from '../../containers/Layout/Layout';
import BackButton from '../common/BackButton/BackButton';
import { MODAL_TYPES } from '../../constants/modal';

const UserProfile = () => {
  const {
    firstName,
    lastName,
    eventsVisited,
    eventsCreated
  } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const redirect = useCallback(route => () => {
    history.push(route);
  }, []);

  const handleModalOpen = useCallback(() => {
    dispatch(openModalAction({
      modalContentType: MODAL_TYPES.CREATE_EVENT
    }));
  }, []);

  return (
    <Layout>
      <BackButton />
      <Box className={style.container}>
        <Box className={style.header}>
          <picture>
            <img src={ProfilePhoto} alt="user" />
          </picture>
          <Box className={style.personalInfo}>
            <Typography>
              {firstName}
              {' '}
              {lastName}
            </Typography>
            <Typography className={style.smallText}>
              Events visited:
              {' '}
              {eventsVisited}
            </Typography>
            <Typography className={style.smallText}>
              Events created:
              {' '}
              {eventsCreated}
            </Typography>
          </Box>
        </Box>

        <Box className={style.myEventsWrapper} onClick={redirect('/userEvents')}>
          <Typography variant="h6">
            My created events
          </Typography>
          <ArrowForwardIcon className={style.myEventsIcon} />
        </Box>

        <Box className={style.myEventsWrapper} onClick={redirect('/userGoingEvents')}>
          <Typography variant="h6">
            My scheduled events
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
