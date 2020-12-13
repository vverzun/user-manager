import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { closeErrorAction } from '../../store/actions';
import style from './style.module.scss';

const ErrorAlert = () => {
  const error = useSelector(state => state.error);

  const dispatch = useDispatch();

  const handleAlertClose = useCallback(() => {
    dispatch(closeErrorAction());
  }, []);

  if (error) {
    console.log('error', error);
  }
  return (
    <div className={style.container}>
      <Collapse in={Boolean(error)}>
        <Alert
          severity="error"
          action={(
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleAlertClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )}
        >
          Error caught.
        </Alert>
      </Collapse>
    </div>
  );
};

export default ErrorAlert;
