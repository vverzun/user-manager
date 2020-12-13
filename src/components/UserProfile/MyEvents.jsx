import React, { useCallback } from 'react';
import {
  Box,
  Typography,
  Fade
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import BackButton from '../common/BackButton/BackButton';
import Layout from '../../containers/Layout/Layout';
import style from './style.module.scss';

const TRANSITION_TIME = 350;

const MyEvents = () => {
  const history = useHistory();
  const handleViewEventDetails = useCallback(id => () => {
    history.push(`/event/${id}`);
  }, []);

  const dispatch = useDispatch();
  const allEvents = useSelector(state => state.allEvents);
  const isLoading = useSelector(state => state.isLoading);

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
      <BackButton />

      My events
    </Layout>
  );
};

export default MyEvents;
