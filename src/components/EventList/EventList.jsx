import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Grow
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { loadEvents } from '../../store/events/actions';
import Layout from '../../containers/Layout/Layout';
import style from './style.module.scss';
import BackButton from '../common/BackButton/BackButton';

const TRANSITION_TIME = 350;

const EventList = () => {
  const history = useHistory();
  const handleViewEventDetails = useCallback(id => () => {
    history.push(`/event/${id}`);
  }, []);

  const dispatch = useDispatch();
  const events = useSelector(state => state.events.events);
  const isLoading = useSelector(state => state.events.isLoading);
  const error = useSelector(state => state.events.error);

  const eventList = _.get(events, '_embedded.events');

  useEffect(() => {
    dispatch(loadEvents());
  }, []);

  const renderEvents = useCallback(() => {
    if (error) {
      return <Typography>Error while fetching events</Typography>;
    }

    if (isLoading) {
      return (
        <>
          <Skeleton className={style.skeletonCard} variant="rect" width={350} height={130} />
          <Skeleton className={style.skeletonCard} variant="rect" width={350} height={130} />
          <Skeleton className={style.skeletonCard} variant="rect" width={350} height={130} />
          <Skeleton className={style.skeletonCard} variant="rect" width={350} height={130} />
          <Skeleton className={style.skeletonCard} variant="rect" width={350} height={130} />
        </>
      );
    }

    if (_.isEmpty(eventList)) {
      return <Typography>There are no events right now</Typography>;
    }

    return _.map(eventList, ({ title, date, location, id }, index) => (
      <Grow in timeout={TRANSITION_TIME * index + TRANSITION_TIME}>
        <Card
          key={id}
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
            <Typography>{moment(date).format('MM:HH DD MMM')}</Typography>
          </CardContent>
        </Card>
      </Grow>
    ));
  });

  return (
    <Layout>
      <Box className={style.eventList}>
        <BackButton />

        <Box className={style.eventsWrapper}>
          {renderEvents()}
        </Box>
      </Box>
    </Layout>
  );
};

export default EventList;
