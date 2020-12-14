import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';

import EventForm from '../../components/EventForm/EventForm';
import style from './styles.modules.scss';
import { closeModalAction } from '../../store/actions';
import { MODAL_TYPES } from '../../constants/modal';
import DeleteEventModalContent from './DeleteEvent';
import CancelParticipation from './CancelParticipationModal';

const Modal = () => {
  const isModalOpened = useSelector(state => state.isModalOpened);
  const modalContentType = useSelector(state => state.modalContentType);
  const modalData = useSelector(state => state.modalData);

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
      {modalContentType === MODAL_TYPES.DELETE_EVENT
      && (
        <DeleteEventModalContent data={modalData} />
      )}

      {modalContentType === MODAL_TYPES.CANCEL_PARTICIPATION
      && (
        <CancelParticipation data={modalData} />
      )}

      {modalContentType === MODAL_TYPES.CREATE_EVENT
      && (
        <EventForm
          title="Create New Event"
          contentText="Fill the inputs below."
          className={style.modalWrapper}
        />
      )}
    </Dialog>
  );
};

export default Modal;
