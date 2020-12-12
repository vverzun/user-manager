import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { closeModal } from '../../containers/Modal/actions';
import { addNewUser, updateExistingUser } from '../../containers/Manager/actions';

const UserForm = ({ title, contentText, contentData }) => {
  const { user, id } = contentData;
  const [userEntity, setUserValue] = useState({ ...user });

  const dispatch = useDispatch();

  const handleInputChange = useCallback(event => {
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
    dispatch(
      id === -1
        ? addNewUser(userEntity)
        : updateExistingUser(id, userEntity)
    );
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
          onChange={handleInputChange}
          value={userEntity.name}
        />
        <TextField
          margin="dense"
          id="surname"
          label="Surname"
          fullWidth
          onChange={handleInputChange}
          value={userEntity.surname}
        />
        <TextField
          margin="dense"
          id="desc"
          label="Description"
          fullWidth
          onChange={handleInputChange}
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
  contentData: PropTypes.arrayOf(PropTypes.object)
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
