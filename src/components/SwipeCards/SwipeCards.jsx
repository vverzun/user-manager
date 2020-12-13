import React, { useCallback, useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Fade
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import TinderCard from 'react-tinder-card';

import Layout from '../../containers/Layout/Layout';
import { loadAllEvents } from '../../store/actions';
import style from './style.module.scss';
import BackButton from '../common/BackButton/BackButton';

const db = [
  {
    name: 'Richard Hendricks',
    url: './img/richard.jpg'
  },
  {
    name: 'Erlich Bachman',
    url: './img/erlich.jpg'
  },
  {
    name: 'Monica Hall',
    url: './img/monica.jpg'
  },
  {
    name: 'Jared Dunn',
    url: './img/jared.jpg'
  },
  {
    name: 'Dinesh Chugtai',
    url: './img/dinesh.jpg'
  }
];

const SwipeCards = () => {
  const [characters, setCharacters] = useState(db);
  const [lastDirection, setLastDirection] = useState();

  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), []);

  const dispatch = useDispatch();
  const allEvents = useSelector(state => state.allEvents);
  const isLoading = useSelector(state => state.isLoading);

  useEffect(() => {
    dispatch(loadAllEvents());
  }, []);

  const onSwipe = direction => {
    console.log(`You swiped: ${direction}`);
  };

  const onCardLeftScreen = myIdentifier => {
    console.log(`${myIdentifier} left the screen`);
  };

  const renderTinderCards = useCallback(() => {
    if (isLoading) {
      return (
        <Skeleton
          className={style.skeletonCard}
          variant="rect"
          width={300}
          height={300}
        />
      );
    }

    // if (_.isEmpty(allEvents)) {
    //   return <Typography>There are no events right now</Typography>;
    // }

    return (
      <TinderCard
        onSwipe={onSwipe}
        onCardLeftScreen={() => onCardLeftScreen('fooBar')}
        preventSwipe={['up', 'down']}
      >
        <Card
          className={style.eventCard}
          elevation={5}
        >
          <CardContent>
            <Typography align="center" variant="h6">title</Typography>
            <Typography align="center">
              Place:
              {' '}
              location
            </Typography>
            <Typography align="center">
              Type:
              {' '}
              location
            </Typography>
            <Typography align="center">
              {moment().format('MM:HH DD MMM')}
            </Typography>
          </CardContent>
        </Card>
      </TinderCard>
    );
  }, [allEvents, isLoading]);

  return (
    <Layout>
      <Box className={style.swipeCards}>
        <BackButton />

        <Box className={style.swipeCardWrapper}>
          {renderTinderCards()}
        </Box>

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
