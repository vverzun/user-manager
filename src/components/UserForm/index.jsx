import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

const UserForm = ({ title, contextText, user }) => {
  const { name, surname, desc } = user;

  const handleCancel = useCallback(() => {
    console.log('cancel');
  }, []);

  const handleSave = useCallback(() => {
    console.log('save');
  }, []);

  return (
    <>
      <DialogTitle id="form-dialog-title">{ title }</DialogTitle>
      <DialogContent>
        <DialogContentText>
          { contextText }
        </DialogContentText>
        <TextField
          margin="dense"
          id="name"
          label="Name"
          fullWidth
          value={name}
        />
        <TextField
          margin="dense"
          id="surname"
          label="Surname"
          fullWidth
          value={surname}
        />
        <TextField
          margin="dense"
          id="desc"
          label="Description"
          fullWidth
          value={desc}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </>
  );
};

UserForm.propTypes = {
  title: PropTypes.string.isRequired,
  contextText: PropTypes.string.isRequired,
  user: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string,
    surname: PropTypes.string,
    desc: PropTypes.string
  })
};

UserForm.defaultProps = {
  user: {
    name: '',
    surname: '',
    desc: ''
  }
};

export default UserForm;
