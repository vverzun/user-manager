import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import Login from '../components/Auth/Login';
import HomePage from '../containers/HomePage/HomePage';
import EventList from '../components/EventList/EventList';
import Event from '../components/Event/Event';
import UserProfile from '../components/UserProfile/UserProfile';
import SignUp from '../components/Auth/SignUp';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/events" component={EventList} />
      <Route exact path="/profile" component={UserProfile} />
      <Route exact path="/event/:id" component={Event} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route component={HomePage} />
    </Switch>
  </BrowserRouter>
);

export default Router;
