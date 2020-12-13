import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MenuItem from '@material-ui/core/MenuItem';

import { loadCreateEvent, closeModalAction } from '../../store/actions';

const PARTY_TYPES = ['DRINKING', 'SPORTS', 'MOVIES', 'ACTION', 'READING', 'BIBLE_STUDY', 'OTHER'];

const EventForm = ({ title }) => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.MOCK_USER_name);

  const [formData, setFormData] = useState({
    title: '',
    partyType: 'OTHER',
    eventDate: '2017-05-24T10:30',
    creationDate: new Date(),
    location: '',
    description: '',
    duration: '',
    radius: '',
    createdBy: { name: username },
    participants: [{ name: username }]
  });

  const handleInputChange = useCallback(event => {
    event.persist();
    setFormData(prevFormData => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }));
  }, [formData]);

  const handleCancel = useCallback(() => {
    dispatch(closeModalAction());
  }, []);

  const handleEventCreate = () => {
    dispatch(loadCreateEvent(formData));
  };

  const menuOptions = useMemo(() => (
    PARTY_TYPES.map(type => (
      <MenuItem value={type} key={uuidv4()}>
        {type}
      </MenuItem>
    ))
  ), []);

  return (
    <>
      <DialogTitle name="form-dialog-title">{ title }</DialogTitle>
      <DialogContent>
        <TextField
          name="title"
          label="Title"
          fullWidth
          onChange={handleInputChange}
          value={formData.title}
        />
        <Select
          onChange={handleInputChange}
          fullWidth
          name="partyType"
          value={formData.partyType}
        >
          {menuOptions}
        </Select>
        <TextField
          name="location"
          label="Location"
          fullWidth
          onChange={handleInputChange}
          value={formData.location}
        />
        <TextField
          type="number"
          name="duration"
          label="Duration"
          fullWidth
          onChange={handleInputChange}
          value={formData.duration}
        />
        <TextField
          type="number"
          name="radius"
          label="Radius"
          fullWidth
          onChange={handleInputChange}
          value={formData.radius}
        />
        <TextField
          name="eventDate"
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
          name="description"
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
