import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { Avatar, Box, Button, Card, Typography, Fade } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import avatar from '../../assets/images/avatar.png';
import party from '../../assets/images/party.jpeg';
import style from './style.module.scss';
import Layout from '../../containers/Layout/Layout';
import BackButton from '../common/BackButton/BackButton';
import { loadEvent } from '../../store/actions';

const Event = () => {
  const { id } = useParams();
  const {
    title,
    date,
    description,
    participants,
    location } = useSelector(state => state.event);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEvent(id));
  }, []);

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
              <Box className={style.participants}>
                {participants.map(participant => (
                  <Avatar key={uuidv4()} src={avatar} alt={participant} />
                ))}
              </Box>
            </Box>
          </Box>

          <Box className={style.actions}>
            <Button variant="contained">Join</Button>
          </Box>
        </Card>
      </Fade>
    </Layout>
  );
};

export default Event;
