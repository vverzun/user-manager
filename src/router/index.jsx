import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import EventList from '../components/EventList/EventList';
import Event from '../components/Event/Event';

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
        <Event />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
