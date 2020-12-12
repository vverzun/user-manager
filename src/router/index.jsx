import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import EventList from '../components/EventList/EventList';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/events">
        <EventList />
      </Route>
      <Route exact path="/profile">
        <div>Profile</div>
      </Route>
      <Route exact path="/event/:id">
        <div>Event</div>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
