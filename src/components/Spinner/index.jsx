import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import style from './style.module.scss';

const Spinner = () => (
  <div className={style.container}>
    <CircularProgress />
  </div>
);

export default Spinner;
