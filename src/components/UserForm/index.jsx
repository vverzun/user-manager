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
import { closeModal } from '../../containers/Modal/actions';
import { addNewUser, updateExistingUser } from '../../containers/Manager/actions';

const UserForm = ({ title, contentText, contentData }) => {
  const { user, id } = contentData;
  const [userEntity, setUserValue] = useState({ ...user });

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
    if (id === -1) {
      dispatch(addNewUser(userEntity));
    } else {
      dispatch(updateExistingUser(id, userEntity));
    }
  }, [userEntity]);

  return (
    <>
      <DialogTitle id="form-dialog-title">{ title }</DialogTitle>
      <DialogContent>
        <DialogContentText>
          { contentText }
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
  contentText: PropTypes.string.isRequired,
  contentData: PropTypes.exact({
    user: PropTypes.exact({
      name: PropTypes.string,
      surname: PropTypes.string,
      desc: PropTypes.string
    }),
    id: PropTypes.number
  })
};

UserForm.defaultProps = {
  contentData: {
    user: {
      name: '',
      surname: '',
      desc: ''
    },
    id: -1
  }
};

export default UserForm;
