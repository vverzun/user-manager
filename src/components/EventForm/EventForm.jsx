import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { closeModalAction } from '../../store/actions';
import { addNewUser, updateExistingUser } from '../../containers/Manager/actions';

const EventForm = ({ title, contentData }) => {
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
    dispatch(closeModalAction());
  }, []);

  const handleSave = useCallback(() => {
    dispatch(closeModalAction());
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
        {/* <DialogContentText>
          { contentText }
        </DialogContentText> */}
        <TextField
          margin="dense"
          id="title"
          label="Title"
          fullWidth
          onChange={handleInputChange}
          value={userEntity.title}
        />
        <TextField
          margin="dense"
          id="location"
          label="Location"
          fullWidth
          onChange={handleInputChange}
          value={userEntity.location}
        />
        <TextField
          type="number"
          margin="dense"
          id="duration"
          label="Duration"
          fullWidth
          onChange={handleInputChange}
          value={userEntity.duration}
        />
        <TextField
          id="datetime-local"
          label="Time"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          multiline
          rowsMax={4}
          margin="dense"
          id="desc"
          label="Description"
          fullWidth
          onChange={handleInputChange}
          value={userEntity.description}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleSave}>
          Save
        </Button>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

EventForm.propTypes = {
  title: PropTypes.string.isRequired,
  contentData: PropTypes.arrayOf(PropTypes.object)
};

EventForm.defaultProps = {
  contentData: {
    user: {
      name: '',
      surname: '',
      desc: ''
    },
    id: -1
  }
};

export default EventForm;
