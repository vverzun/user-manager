import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import EventForm from '../../components/EventForm/EventForm';
import style from './styles.modules.scss';
import { closeModalAction } from '../../store/actions';

const Modal = () => {
  const isModalOpened = useSelector(state => state.isModalOpened);

  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(closeModalAction());
  }, []);

  return (
    <Dialog
      open={isModalOpened}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"

    >
      <EventForm
        title="Create New Event"
        contentText="Fill the inputs below."
        className={style.modalWrapper}
      />
    </Dialog>
  );
};

export default Modal;
