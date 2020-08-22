import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import UserForm from '../../components/UserForm';
import Confirmation from '../../components/Confirmation';
import { closeModal } from './actions';
import { CREATE, UPDATE, CONFIRM } from '../../constants/modal';

const Modal = () => {
  const isOpened = useSelector(state => state.modal.isOpened);
  const contentType = useSelector(state => state.modal.contentType);
  const contentData = useSelector(state => state.modal.contentData);

  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, []);

  return (
    <div>
      <Dialog open={isOpened} onClose={handleClose} aria-labelledby="form-dialog-title">
        {
          contentType === CREATE
          && (
            <UserForm
              title="Create New User"
              contextText="Fill the inputs below."
            />
          )
        }
        {
          contentType === UPDATE
          && (
            <UserForm
              title="Update User"
              contextText="Edit the inputs below."
              user={contentData}
            />
          )
        }
        {
          contentType === CONFIRM
          && (
            <Confirmation
              title="Confirmation"
              contextText="Are you sure you want to delete the user?"
            />
          )
        }
      </Dialog>
    </div>
  );
};

export default Modal;
