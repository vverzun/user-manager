import React, { useCallback } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Grow
} from '@material-ui/core';

import Layout from '../../containers/Layout/Layout';
import style from './style.module.scss';
import eventList from '../../mockData/eventList';
import BackButton from '../common/BackButton/BackButton';

const TRANSITION_TIME = 350;

const EventList = () => {
  const history = useHistory();
  const handleViewEventDetails = useCallback(id => () => {
    history.push(`/event/${id}`);
  }, []);

  const renderEvents = useCallback(() => (
    _.map(eventList, ({ title, date, location, id }, index) => (
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
  ), [eventList]);

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
