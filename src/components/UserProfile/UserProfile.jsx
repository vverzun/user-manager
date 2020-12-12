import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { openModal } from '../../containers/Modal/actions';
import { MODAL_TYPES } from '../../constants/modal';
import user from '../../assets/images/user.png';
import style from './style.module.scss';
import userData from '../../mockData/userProfile';

const Header = () => {
  const dispatch = useDispatch();

  const handleModalOpen = useCallback(() => {
    dispatch(openModal(MODAL_TYPES.CREATE_EVENT));
  }, []);

  const { firstName, lastName, eventsVisited, eventsCreated } = userData;

  return (
    <Box className={style.container}>
      <Box className={style.header}>
        <picture>
          <img src={user} alt="user icon" />
        </picture>
        <Typography>
          {firstName}
          {' '}
          {lastName}
        </Typography>
      </Box>

      <Box className={style.infoWrapper}>
        <Typography>
          Events visited:
          {' '}
          {eventsVisited}
        </Typography>
        <Typography>
          Events created:
          {' '}
          {eventsCreated}
        </Typography>
      </Box>

      <Box className={style.eventButtonWrapper}>
        <Button
          variant="contained"
          onClick={handleModalOpen}
        >
          Add new Event
        </Button>
      </Box>
    </Box>
  );
};

export default Header;