import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import HomePage from '../containers/HomePage/HomePage';
import EventList from '../components/EventList/EventList';
import Event from '../components/Event/Event';
import UserProfile from '../components/UserProfile/UserProfile';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/events">
        <EventList />
      </Route>
      <Route exact path="/profile">
        <UserProfile />
      </Route>
      <Route exact path="/event/:id">
        <Event />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
