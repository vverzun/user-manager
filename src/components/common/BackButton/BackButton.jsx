import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import style from './style.module.scss';

const BackButton = () => {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  return (
    <Box className={style.backButtonWrapper} onClick={handleClick}>
      <ArrowBackIcon fontSize="small" />
      <Typography className={style.goBackTitle}>Go Back</Typography>
    </Box>
  );
};

export default BackButton;
