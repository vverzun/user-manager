import React, { useCallback, useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Fade
} from '@material-ui/core';
import TinderCard from 'react-tinder-card';

import Layout from '../../containers/Layout/Layout';
import { loadAllEvents, addEventToGoing, removeEventFromGoing } from '../../store/actions';
import style from './style.module.scss';
import BackButton from '../common/BackButton/BackButton';

const SwipeCards = () => {
  const [characters, setCharacters] = useState();
  const [lastDirection, setLastDirection] = useState();

  const dispatch = useDispatch();
  const events = useSelector(state => state.allEvents);
  const isLoading = useSelector(state => state.isLoading);

  const childRefs = useMemo(() => events && Array(events.length).fill(0).map(i => React.createRef()), []);

  useEffect(() => {
    dispatch(loadAllEvents());
  }, []);

  const onSwipe = (direction, id) => {
    if (direction === 'right') {
      dispatch(addEventToGoing(id));
    } else if (direction === 'left') {
      dispatch(removeEventFromGoing(id));
    }

    setLastDirection(direction);
  };

  const onCardLeftScreen = myIdentifier => {
    console.log(`${myIdentifier} left the screen`);
  };

  const renderTinderCards = useCallback(() => {
    if (_.isEmpty(events)) {
      return <Typography>There are no events right now</Typography>;
    }

    return (
      _.map(events, event => {
        const { title, location, eventDate, eventType, id, createdBy, participants } = event;
        return (
          <TinderCard
            key={id}
            onSwipe={direction => onSwipe(direction, id)}
            onCardLeftScreen={() => onCardLeftScreen('fooBar')}
            preventSwipe={['up', 'down']}
            className={style.tinderCard}
          >
            <Card
              className={style.eventCard}
              elevation={5}
            >
              <CardContent>
                <Typography align="center" variant="h4">{title}</Typography>
                <Typography align="center">
                  Place:
                  {' '}
                  {location}
                </Typography>
                <Typography align="center">
                  Type:
                  {' '}
                  {eventType}
                </Typography>
                <Typography align="center">
                  {moment(eventDate).format('MM:HH DD MMM')}
                </Typography>

                <Typography className={style.hostInfo} align="center">
                  Host:
                  {' '}
                  {createdBy.firstName}
                  {' '}
                  {createdBy.lastName}
                </Typography>
                <Typography align="center">
                  Going:
                  {' '}
                  {participants.length}
                  {' '}
                  people
                </Typography>
              </CardContent>
            </Card>
          </TinderCard>
        );
      })
    );
  }, [events, isLoading]);

  return (
    <Layout>
      <Box className={style.swipeCards}>
        <BackButton />

        <Box className={style.swipeCardWrapper}>
          {renderTinderCards()}
        </Box>

        {lastDirection
        && (
          <Fade in timeout={{ enter: 500 }}>
            <Box className={style.goingInfo}>
              <Typography variant="h5" align="center">
                You are
                {' '}
                {lastDirection === 'right' ? 'Going!' : 'not going'}
              </Typography>
            </Box>
          </Fade>
        )}

        <Fade in timeout={{ enter: 500 }}>
          <Box className={style.infoWrapper}>
            <Typography align="center">
              Swipe right to show interest
            </Typography>
            <Typography align="center">
              Swipe left to miss the event
            </Typography>
          </Box>
        </Fade>
      </Box>
    </Layout>
  );
};

export default SwipeCards;
