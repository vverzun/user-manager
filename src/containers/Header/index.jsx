import React, { useCallback } from 'react';
import { Typography, Button } from '@material-ui/core';
import user from '../../assets/images/user.png';
import style from './style.module.scss';

const Header = () => {
  const handleUserAdd = useCallback(() => {
    console.log('create');
  }, []);

  return (
    <div className={style.container}>
      <div className={style.title}>
        <picture>
          <img src={user} alt="user icon" />
        </picture>
        <Typography>
          USER MANAGER
        </Typography>
      </div>
      <Button
        variant="contained"
        onClick={handleUserAdd}
      >
        Add new user
      </Button>
    </div>
  );
};

export default Header;
