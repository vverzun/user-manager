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

import Layout from '../../containers/Layout/Layout';
import { loadAllEvents } from '../../store/actions';
import style from './style.module.scss';
import BackButton from '../common/BackButton/BackButton';

const TRANSITION_TIME = 350;

const EventList = () => {
  const history = useHistory();
  const handleViewEventDetails = useCallback(id => () => {
    history.push(`/event/${id}`);
  }, []);

  const dispatch = useDispatch();
  const allEvents = useSelector(state => state.allEvents);
  const isLoading = useSelector(state => state.isLoading);

  useEffect(() => {
    dispatch(loadAllEvents());
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
            width={350}
            height={130}
          />
        ))
      );
    }

    if (_.isEmpty(allEvents)) {
      return <Typography>There are no events right now</Typography>;
    }

    return _.map(allEvents, ({ title, date, location, id }, index) => (
      <Grow in timeout={TRANSITION_TIME * index + TRANSITION_TIME} key={id}>
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
  }, [allEvents, isLoading]);

  return (
    <Layout>
      <Box className={style.eventList}>
        <BackButton />

        <Typography variant="h5" align="center">
          Events list
        </Typography>

        <Box className={style.eventsWrapper}>
          {renderEvents()}
        </Box>
      </Box>
    </Layout>
  );
};

export default EventList;
