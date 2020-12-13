import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useDispatch } from 'react-redux';

import { deleteEvent as deleteEventAction, closeModalAction } from '../../store/actions';

const MOCK_USER_ID = 'fedab535-56ad-4c12-9b4e-c409e8233f8d';

const DeleteEvent = ({ data: { eventId } }) => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModalAction());
  };

  const handleConfirm = () => {
    dispatch(deleteEventAction(eventId, MOCK_USER_ID));
    dispatch(closeModalAction());
  };

  return (
    <>
      <DialogContent>
        <DialogContentText align="center">
          Are you sure you want to delete this event?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleConfirm}>
          Yes
        </Button>
        <Button onClick={handleCloseModal}>
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

export default DeleteEvent;
