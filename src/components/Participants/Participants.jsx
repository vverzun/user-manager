import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Avatar, Typography } from '@material-ui/core';
import Layout from '../../containers/Layout/Layout';
import BackButton from '../common/BackButton/BackButton';
import { loadParticipants } from '../../store/actions';
import avatar from '../../assets/images/avatar.png';
import style from './style.module.scss';

const Participants = () => {
  const { id } = useParams();
  const participants = useSelector(state => state.participants);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadParticipants(id));
  }, []);

  const renderParticipants = useCallback(() => (
    _.map(participants, ({ firstName, lastName }) => (
      <Card className={style.card} key={uuidv4()}>
        <Avatar className={style.avatar} src={avatar} alt={firstName} />
        <Typography className={style.firstName}>{firstName}</Typography>
        <Typography>{lastName}</Typography>
      </Card>
    ))
  ), [participants]);

  return (
    <Layout>
      <BackButton />
      <Box className={style.participantsContainer}>
        {renderParticipants()}
      </Box>
    </Layout>
  );
};

export default Participants;
