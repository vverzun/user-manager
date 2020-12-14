import React, { useEffect, useMemo, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Avatar, Box, Button, Card, Typography, Fade } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import avatar from '../../assets/images/avatar.png';
import party from '../../assets/images/party.jpeg';
import style from './style.module.scss';
import Layout from '../../containers/Layout/Layout';
import BackButton from '../common/BackButton/BackButton';
import { loadEvent, joinEvent, openModalAction } from '../../store/actions';
import { MODAL_TYPES } from '../../constants/modal';

const Event = () => {
  const { id } = useParams();
  const userId = localStorage.getItem('userId');

  const {
    title,
    description,
    location,
    date,
    participants
  } = useSelector(state => state.event);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleRedirectToParticipants = () => {
    history.push(`/participants/${id}`);
  };

  useEffect(() => {
    dispatch(loadEvent(id));
  }, []);

  const handleModalOpen = useCallback(() => {
    dispatch(openModalAction({
      modalContentType: MODAL_TYPES.CANCEL_PARTICIPATION,
      data: { eventId: id }
    }));
  }, []);

  const handleGoing = () => {
    dispatch(joinEvent(id));
  };

  const isAlreadyGoing = useMemo(() => (
    _.findIndex(participants, ({ id }) => id === userId) !== -1
  ), [participants, handleModalOpen, handleGoing]);

  return (
    <Layout>
      <BackButton />
      <Fade in timeout={{ enter: 500 }}>
        <Card elevation={4} className={style.wrapper}>
          <Typography variant="h3" className={style.eventTitle}>
            {title}
          </Typography>

          <Box className={style.dateAndTimeWrapper}>
            <Typography>
              Date:
              {' '}
              {moment(date).format('MM:HH DD MMM')}
            </Typography>
            <Typography>
              Location:
              {' '}
              {location}
            </Typography>
          </Box>

          <Box className={style.infoWrapper}>
            <Box className={style.image}>
              <img src={party} alt="party" />
            </Box>
            <Box className={style.description}>
              <Typography>
                {description}
              </Typography>
            </Box>
            <Box>
              <Typography className={style.text}>
                Participants
              </Typography>
              <Box className={style.participants} onClick={handleRedirectToParticipants}>
                {_.map(participants, participant => (
                  <Avatar key={uuidv4()} src={avatar} alt={participant.firstName} />
                ))}
              </Box>
            </Box>
          </Box>

          {
            isAlreadyGoing
              ? (
                <Box className={style.actions} onClick={handleModalOpen}>
                  <Button variant="contained">Not going anymore</Button>
                </Box>
              )
              : (
                <Box className={style.actions} onClick={handleGoing}>
                  <Button variant="contained">Join</Button>
                </Box>
              )
          }
        </Card>
      </Fade>
    </Layout>
  );
};

export default Event;
