import React, { useCallback } from 'react';
import _ from 'lodash';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import style from './style.module.scss';
import eventList from '../../mockData/eventList';

const EventList = () => {
  const renderEvents = useCallback(() => (
    _.map(eventList, ({ title, date, location, id }) => (
      <Card
        key={id}
        variant="outlined"
        className={style.eventCard}
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
    ))
  ), [eventList]);

  return (
    <Box className={style.eventsWrapper}>
      {renderEvents()}
    </Box>
  );
};

export default EventList;