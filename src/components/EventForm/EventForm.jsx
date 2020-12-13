import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { loadCreateEvent, closeModalAction } from '../../store/actions';

const EventForm = ({ title }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    eventDate: '2017-05-24T10:30',
    creationDate: new Date(),
    location: '',
    description: '',
    duration: '',
    radius: '',
    createdBy: '998425f3-d7ab-44c4-ba59-8d8a7d4eb28d',
    participants: [{ id: '998425f3-d7ab-44c4-ba59-8d8a7d4eb28d' }]
  });

  const handleInputChange = useCallback(event => {
    event.persist();
    setFormData(prevFormData => ({
      ...prevFormData,
      [event.target.id]: event.target.value
    }));
  }, [formData]);

  const handleCancel = useCallback(() => {
    dispatch(closeModalAction());
  }, []);

  const handleEventCreate = () => {
    dispatch(loadCreateEvent(formData));
  };

  return (
    <>
      <DialogTitle id="form-dialog-title">{ title }</DialogTitle>
      <DialogContent>
        <TextField
          id="title"
          label="Title"
          fullWidth
          onChange={handleInputChange}
          value={formData.title}
        />
        <TextField
          id="location"
          label="Location"
          fullWidth
          onChange={handleInputChange}
          value={formData.location}
        />
        <TextField
          type="number"
          id="duration"
          label="Duration"
          fullWidth
          onChange={handleInputChange}
          value={formData.duration}
        />
        <TextField
          type="number"
          id="radius"
          label="Radius"
          fullWidth
          onChange={handleInputChange}
          value={formData.radius}
        />
        <TextField
          id="eventDate"
          label="Time"
          type="datetime-local"
          InputLabelProps={{
            shrink: true
          }}
          onChange={handleInputChange}
          value={formData.eventDate}
        />
        <TextField
          multiline
          rowsMax={4}
          id="description"
          label="Description"
          fullWidth
          onChange={handleInputChange}
          value={formData.description}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleEventCreate}>
          Create
        </Button>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

EventForm.propTypes = {
  title: PropTypes.string.isRequired
};

export default EventForm;
