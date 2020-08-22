import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { addNewUser } from '../../containers/Manager/actions';
import { closeModal } from '../../containers/Modal/actions';

const UserForm = ({ title, contextText, user }) => {
  const [userEntity, setUserValue] = useState({
    name: user.name,
    surname: user.surname,
    desc: user.desc
  });

  const dispatch = useDispatch();

  const handleChange = useCallback(event => {
    event.persist();
    setUserValue(prevUserEntity => ({
      ...prevUserEntity,
      [event.target.id]: event.target.value
    }));
  }, [userEntity]);

  const handleCancel = useCallback(() => {
    dispatch(closeModal());
  }, []);

  const handleSave = useCallback(() => {
    dispatch(closeModal());
    dispatch(addNewUser(userEntity));
  }, [userEntity]);

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
          onChange={handleChange}
          value={userEntity.name}
        />
        <TextField
          margin="dense"
          id="surname"
          label="Surname"
          fullWidth
          onChange={handleChange}
          value={userEntity.surname}
        />
        <TextField
          margin="dense"
          id="desc"
          label="Description"
          fullWidth
          onChange={handleChange}
          value={userEntity.desc}
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
