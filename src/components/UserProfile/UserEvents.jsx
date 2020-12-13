import React, { useCallback, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';
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
import DeleteIcon from '@material-ui/icons/Close';

import { loadUserCreatedEvents, openModalAction } from '../../store/actions';
import BackButton from '../common/BackButton/BackButton';
import Layout from '../../containers/Layout/Layout';
import style from './style.module.scss';
import { MODAL_TYPES } from '../../constants/modal';

const TRANSITION_TIME = 350;

const MOCK_USER_ID = 'fedab535-56ad-4c12-9b4e-c409e8233f8d';

const UserEvents = () => {
  const history = useHistory();
  const handleViewEventDetails = useCallback(id => () => {
    history.push(`/event/${id}`);
  }, []);

  const dispatch = useDispatch();
  const handleModalOpen = useCallback(eventId => {
    dispatch(openModalAction({
      modalContentType: MODAL_TYPES.DELETE_EVENT,
      data: { eventId }
    }));
  }, []);

  const userCreatedEvents = useSelector(state => state.userCreatedEvents);
  const isLoading = useSelector(state => state.isLoading);

  useEffect(() => {
    dispatch(loadUserCreatedEvents(MOCK_USER_ID));
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

    if (_.isEmpty(userCreatedEvents)) {
      return <Typography>There are no events right now</Typography>;
    }

    return _.map(userCreatedEvents, ({ title, date, location, id }, index) => (
      <Grow in timeout={TRANSITION_TIME * index + TRANSITION_TIME} key={id}>
        <Card
          key={id}
          className={style.eventCard}
          // onClick={handleViewEventDetails(id)}
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

            <DeleteIcon className={style.deleteIcon} onClick={() => handleModalOpen(id)} />
          </CardContent>
        </Card>
      </Grow>
    ));
  }, [userCreatedEvents, isLoading]);

  return (
    <Layout>
      <BackButton />

      <Typography variant="h5" align="center">
        Events by me
      </Typography>

      <Box className={style.eventsWrapper}>
        {renderEvents()}
      </Box>
    </Layout>
  );
};

export default UserEvents;
