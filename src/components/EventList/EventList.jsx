import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Grow,
  Collapse,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Skeleton from '@material-ui/lab/Skeleton';

import Layout from '../../containers/Layout/Layout';
import { loadAllEvents, loadAllEventsFiltered } from '../../store/actions';
import style from './style.module.scss';
import BackButton from '../common/BackButton/BackButton';

const TRANSITION_TIME = 350;

const PARTY_TYPES = ['DRINKING', 'SPORTS', 'MOVIES', 'ACTION', 'READING', 'BIBLE_STUDY', 'OTHER'];

const EventList = () => {
  const [formData, setFormData] = useState({
    radius: '10',
    eventDate: {
      from: null,
      to: null
    },
    createdDate: {
      from: null,
      to: null
    },
    partyType: 'OTHER'
  });

  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);

  const handleInputChange = useCallback(event => {
    event.persist();

    const [name, value] = _.at(event, 'target.name', 'target.value');

    setFormData(_.set({ ...formData }, name, value));
  }, [formData]);

  const history = useHistory();
  const handleViewEventDetails = useCallback(id => () => {
    history.push(`/event/${id}`);
  }, []);

  const dispatch = useDispatch();
  const allEvents = useSelector(state => state.allEvents);
  const isLoading = useSelector(state => state.isLoading);

  useEffect(() => {
    dispatch(loadAllEvents());
  }, []);

  const renderEvents = useCallback(() => {
    if (isLoading) {
      const cards = _.range(5);

      return (
        _.map(cards, (el, index) => (
          <Skeleton
            key={index}
            className={style.skeletonCard}
            variant="rect"
            width={350}
            height={130}
          />
        ))
      );
    }

    if (_.isEmpty(allEvents)) {
      return <Typography align="center">There are no events right now</Typography>;
    }

    return _.map(allEvents, ({ title, date, location, id }, index) => (
      <Grow in timeout={TRANSITION_TIME * index + TRANSITION_TIME} key={id}>
        <Card
          key={id}
          className={style.eventCard}
          onClick={handleViewEventDetails(id)}
          elevation={3}
        >
          <CardContent>
            <Typography variant="h6">{title}</Typography>
            <Typography>
              Place:
              {' '}
              {location}
            </Typography>
            <Typography>{moment(date).format('MM:HH DD MMM')}</Typography>
          </CardContent>
        </Card>
      </Grow>
    ));
  }, [allEvents, isLoading]);

  const renderPartyTypeOptions = () => (
    _.map(PARTY_TYPES, type => (
      <MenuItem value={type} key={type} name="partyType">
        {type}
      </MenuItem>
    ))
  );

  const toggleFilters = () => {
    setIsFilterCollapsed(!isFilterCollapsed);
  };

  const getValidRange = rangeObj => {
    if (rangeObj.from && rangeObj.to) {
      return {
        from: moment(rangeObj.from).valueOf(),
        to: moment(rangeObj.to).valueOf()
      };
    }

    return false;
  };

  const validateFilters = filters => {
    const mappedFilters = {};

    _.forEach(filters, (value, key) => {
      if (key === 'eventDate' || key === 'createdDate') {
        const validRange = getValidRange(value);
        if (validRange) {
          mappedFilters[key] = validRange;
        } else {
          mappedFilters[key] = null;
        }
      } else {
        mappedFilters[key] = value;
      }
    });

    return mappedFilters;
  };

  const handleSearch = () => {
    const mappedFilters = validateFilters(formData);
    dispatch(loadAllEventsFiltered(mappedFilters));
  };

  return (
    <Layout>
      <Box className={style.eventList}>
        <BackButton />

        <Typography variant="h5" align="center">
          Events list
        </Typography>

        <Box className={style.filtersButtonWrapper}>
          <Button
            variant="outlined"
            className={style.button}
            onClick={toggleFilters}
          >
            Filters
            {isFilterCollapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Button>
        </Box>

        <Collapse in={isFilterCollapsed}>
          <Box className={style.filtersWrapper}>
            <TextField
              name="radius"
              label="Radius"
              variant="outlined"
              className={style.input}
              onChange={handleInputChange}
              value={formData.radius}
            />

            <TextField
              name="eventDate.from"
              label="Event Date From"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
              className={style.input}
              onChange={handleInputChange}
              value={formData.eventDate.from}
            />

            <TextField
              name="eventDate.to"
              label="Event Date To"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
              className={style.input}
              onChange={handleInputChange}
              value={formData.eventDate.to}
            />

            <TextField
              name="createdDate.from"
              label="Created Date From"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
              className={style.input}
              onChange={handleInputChange}
              value={formData.createdDate.from}
            />

            <TextField
              name="createdDate.to"
              label="Created Date To"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
              className={style.input}
              onChange={handleInputChange}
              value={formData.createdDate.to}
            />

            <Box className={style.inputSelect}>
              <InputLabel id="demo-simple-select-outlined-label">
                Party type
              </InputLabel>
              <Select
                name="partyType"
                labelId="demo-simple-select-outlined-label"
                placeholder="Party type"
                onChange={handleInputChange}
                value={formData.partyType}
              >
                {renderPartyTypeOptions()}
              </Select>
            </Box>

            <Button
              variant="outlined"
              className={style.button}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
        </Collapse>

        <Box className={style.eventsWrapper}>
          {renderEvents()}
        </Box>
      </Box>
    </Layout>
  );
};

export default EventList;
