import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { closeModal } from '../../containers/Modal/actions';
import { deleteExistingUser } from '../../containers/Manager/actions';

const Confirmation = ({ title, contentText }) => {
  const { id } = useSelector(state => state.modal.contentData);
  const dispatch = useDispatch();

  const handleNegation = useCallback(() => {
    dispatch(closeModal());
  }, []);

  const handleConfirmation = useCallback(() => {
    dispatch(closeModal());
    dispatch(deleteExistingUser(id));
  }, []);

  return (
    <>
      <DialogTitle id="form-dialog-title">{ title }</DialogTitle>
      <DialogContent>
        <DialogContentText>
          { contentText }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNegation}>
          NO
        </Button>
        <Button onClick={handleConfirmation}>
          YES
        </Button>
      </DialogActions>
    </>
  );
};

Confirmation.propTypes = {
  title: PropTypes.string.isRequired,
  contentText: PropTypes.string.isRequired
};

export default Confirmation;
