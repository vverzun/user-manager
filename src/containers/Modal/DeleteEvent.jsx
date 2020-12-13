import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useDispatch } from 'react-redux';

import { deleteEvent as deleteEventAction, closeModalAction } from '../../store/actions';

const DeleteEvent = ({ data: { eventId } }) => {
  console.log('eventId', eventId);

  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModalAction());
  };

  const handleConfirm = () => {
    console.log('here');
    dispatch(deleteEventAction(eventId));
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
