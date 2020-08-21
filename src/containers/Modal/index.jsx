import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import UserForm from '../../components/UserForm';
import Confirmation from '../../components/Confirmation';
import { CREATE, UPDATE, CONFIRM } from '../../constants/modal';

const Modal = () => {
  const [open, setOpen] = React.useState(true);
  const contentType = CONFIRM;
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
