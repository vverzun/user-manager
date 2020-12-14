import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MenuItem from '@material-ui/core/MenuItem';

import { loadUpdateEvent, closeModalAction } from '../../store/actions';
import style from './style.module.scss';

const PARTY_TYPES = ['DRINKING', 'SPORTS', 'MOVIES', 'ACTION', 'READING', 'BIBLE_STUDY', 'OTHER'];

const EventForm = ({ title, data }) => {
  const dispatch = useDispatch();
  if (data) {
    data.partyType = data.eventType;
  }

  const [formData, setFormData] = useState(data || {
    title: '',
    partyType: 'OTHER',
    eventDate: '2017-05-24T10:30',
    creationDate: new Date(),
    location: '',
    description: '',
    duration: '',
    radius: ''
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
    dispatch(loadUpdateEvent(formData));
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
      <DialogTitle name="form-dialog-title" className={style.title}>
        { title }
      </DialogTitle>
      <DialogContent>
        <TextField
          className={style.input}
          variant="outlined"
          name="title"
          label="Title"
          fullWidth
          onChange={handleInputChange}
          value={formData.title}
        />
        <Select
          className={style.input}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          name="partyType"
          value={formData.partyType}
        >
          {menuOptions}
        </Select>
        <TextField
          className={style.input}
          variant="outlined"
          name="location"
          label="Location"
          fullWidth
          onChange={handleInputChange}
          value={formData.location}
        />
        <TextField
          className={style.input}
          variant="outlined"
          type="number"
          name="duration"
          label="Duration"
          fullWidth
          onChange={handleInputChange}
          value={formData.duration}
        />
        <TextField
          className={style.input}
          variant="outlined"
          type="number"
          name="radius"
          label="Radius"
          fullWidth
          onChange={handleInputChange}
          value={formData.radius}
        />
        <TextField
          className={style.input}
          variant="outlined"
          name="eventDate"
          fullWidth
          label="Date and time"
          type="datetime-local"
          InputLabelProps={{
            shrink: true
          }}
          onChange={handleInputChange}
          value={formData.eventDate}
        />
        <TextField
          className={style.input}
          variant="outlined"
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
