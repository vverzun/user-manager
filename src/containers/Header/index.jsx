import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { openModal } from '../Modal/actions';
import { CREATE } from '../../constants/modal';
import user from '../../assets/images/user.png';
import style from './style.module.scss';

const Header = () => {
  const dispatch = useDispatch();

  const handleModalOpen = useCallback(() => {
    dispatch(openModal(CREATE));
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
        onClick={handleModalOpen}
      >
        Add new user
      </Button>
    </div>
  );
};

export default Header;
