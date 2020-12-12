import React from 'react';
import { arrayOf, string } from 'prop-types';
import moment from 'moment';
import { Avatar, Box, Button, Card, Typography } from '@material-ui/core';
import avatar from '../../assets/images/avatar.png';
import party from '../../assets/images/party.jpeg';
import style from './style.module.scss';

const Event = ({
  title,
  date,
  description,
  participants,
  location
}) => (
  <Card className={style.wrapper}>
    <Typography variant="h3">
      {title}
    </Typography>
    <Box className={style.dateAndTimeWrapper}>
      <Typography>
        Date:
        {' '}
        {moment(date).format('MM:HH DD MMM')}
      </Typography>
      <Typography>
        Location:
        {' '}
        {location}
      </Typography>
    </Box>
    <Box className={style.infoWrapper}>
      <Box className={style.image}>
        <img src={party} alt="party" />
      </Box>
      <Box className={style.description}>
        <Typography>
          {description}
        </Typography>
      </Box>
      <Box>
        <Typography className={style.text}>
          Participants
        </Typography>
        <Box className={style.participants}>
          {participants.map(participant => (
            <Avatar src={avatar} alt={participant} />
          ))}
        </Box>
      </Box>
    </Box>
    <Box className={style.actions}>
      <Button variant="contained">Join</Button>
    </Box>
  </Card>
);

Event.propTypes = {
  title: string.isRequired,
  date: string.isRequired,
  description: string.isRequired,
  participants: arrayOf(string).isRequired,
  location: string.isRequired
};

export default Event;
