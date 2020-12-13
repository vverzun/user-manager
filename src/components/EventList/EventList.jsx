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
import { loadAllEvents } from '../../store/actions';

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
  const allEvents = useSelector(state => state.allEvents);
  const isLoading = useSelector(state => state.isLoading);

  // const eventList = _.get(events, '_embedded.events');

  useEffect(() => {
    dispatch(loadAllEvents());
  }, []);

  const renderEvents = useCallback(() => (
    _.map(allEvents, ({ title, date, location, id }, index) => (
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
    ))
  ), [allEvents]);

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
