import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import UserForm from '../../modals/UserForm';
import Confirmation from '../../modals/Confirmation';
import { CREATE, UPDATE, DELETE } from '../../constants/modal';

const Modal = () => {
  const [open, setOpen] = React.useState(true);
  const contentType = DELETE;
  const userData = {
    name: 'Igor',
    surname: 'Kolesnikov',
    desc: 'Good guy'
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
              user={userData}
            />
          )
        }
        {
          contentType === DELETE
          && (
            <Confirmation
              title="Are you sure you want to delete the user?"
            />
          )
        }
      </Dialog>
    </div>
  );
};

export default Modal;
