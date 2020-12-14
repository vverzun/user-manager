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
import EditIcon from '@material-ui/icons/Edit';

import { loadUserCreatedEvents, openModalAction } from '../../store/actions';
import BackButton from '../common/BackButton/BackButton';
import Layout from '../../containers/Layout/Layout';
import style from './style.module.scss';
import { MODAL_TYPES } from '../../constants/modal';

const TRANSITION_TIME = 350;

const UserEvents = () => {
  const history = useHistory();
  const handleViewEventDetails = useCallback(id => () => {
    history.push(`/event/${id}`);
  }, []);

  const userCreatedEvents = useSelector(state => state.userCreatedEvents);
  const isLoading = useSelector(state => state.isLoading);

  const dispatch = useDispatch();
  const handleModalOpen = useCallback((eventId, action) => {
    if (action === 'delete') {
      dispatch(openModalAction({
        modalContentType: MODAL_TYPES.DELETE_EVENT,
        data: { eventId }
      }));
    } else {
      dispatch(openModalAction({
        modalContentType: MODAL_TYPES.EDIT_EVENT,
        data: { eventId, eventData: userCreatedEvents.find(event => event.id === eventId) }
      }));
    }
  }, [userCreatedEvents]);

  useEffect(() => {
    dispatch(loadUserCreatedEvents());
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

    if (_.isEmpty(userCreatedEvents)) {
      return <Typography align="center">There are no events right now</Typography>;
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

            <DeleteIcon className={style.deleteIcon} onClick={() => handleModalOpen(id, 'delete')} />
            <EditIcon className={style.editIcon} onClick={() => handleModalOpen(id, 'update')} />
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
