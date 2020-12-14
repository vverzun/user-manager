import React, { useCallback, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Grow
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';

import { loadUserGoingEvents } from '../../store/actions';
import BackButton from '../common/BackButton/BackButton';
import Layout from '../../containers/Layout/Layout';
import style from './style.module.scss';

const TRANSITION_TIME = 350;

const UserGoingEvents = () => {
  const history = useHistory();

  const handleViewEventDetails = useCallback(id => () => {
    history.push(`/event/${id}`);
  }, []);

  const dispatch = useDispatch();

  const userGoingEvents = useSelector(state => state.userGoingEvents);
  const isLoading = useSelector(state => state.isLoading);

  useEffect(() => {
    dispatch(loadUserGoingEvents());
  }, []);

  const renderEvents = useCallback(() => {
    if (isLoading) {
      const cards = _.range(5);

      return (
        _.map(cards, (el, index) => (
          <Skeleton
            key={index}
            className={style.skeletonCard}
            variant="rect"
            width={325}
            height={130}
          />
        ))
      );
    }

    if (_.isEmpty(userGoingEvents)) {
      return <Typography align="center">You are not going to any events yet</Typography>;
    }

    return _.map(userGoingEvents, ({ title, eventDate, location, id }, index) => (
      <Grow in timeout={TRANSITION_TIME * index + TRANSITION_TIME} key={uuidv4()}>
        <Card
          className={style.eventCard}
          onClick={handleViewEventDetails(id)}
          elevation={3}
        >
          <CardContent>
            <Typography variant="h6">{title}</Typography>
            <Typography>
              Place:
              {' '}
              {location}
            </Typography>
            <Typography>{moment(eventDate).format('MM:HH DD MMM')}</Typography>
          </CardContent>
        </Card>
      </Grow>
    ));
  }, [userGoingEvents, isLoading]);

  return (
    <Layout>
      <BackButton />

      <Typography variant="h5" align="center">
        Events I'm going to
      </Typography>

      <Box className={style.eventsWrapper}>
        {renderEvents()}
      </Box>
    </Layout>
  );
};

export default UserGoingEvents;
