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
  const userData = useSelector(state => state.modal.contentData);

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
              contentText="Fill the inputs below."
            />
          )
        }
        {
          contentType === UPDATE
          && (
            <UserForm
              title="Update User"
              contentText="Edit the inputs below."
              contentData={userData}
            />
          )
        }
        {
          contentType === CONFIRM
          && (
            <Confirmation
              title="Confirmation"
              contentText="Are you sure you want to delete user?"
              contentData={userData}
            />
          )
        }
      </Dialog>
    </div>
  );
};

export default Modal;
