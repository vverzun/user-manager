import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import HomePage from '../containers/HomePage/HomePage';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/events">
        <div>Events</div>
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
