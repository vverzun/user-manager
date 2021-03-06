import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Login from '../components/Auth/Login';
import HomePage from '../containers/HomePage/HomePage';
import EventList from '../components/EventList/EventList';
import Event from '../components/Event/Event';
import UserProfile from '../components/UserProfile/UserProfile';
import UserEvents from '../components/UserProfile/UserEvents';
import UserGoingEvents from '../components/UserProfile/UserGoingEvents';
import SignUp from '../components/Auth/SignUp';
import SwipeCards from '../components/SwipeCards/SwipeCards';
import Participants from '../components/Participants/Participants';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <ProtectedRoute exact path="/events" component={EventList} />
      <ProtectedRoute exact path="/profile" component={UserProfile} />
      <ProtectedRoute exact path="/event/:id" component={Event} />
      <ProtectedRoute exact path="/userEvents" component={UserEvents} />
      <ProtectedRoute exact path="/userGoingEvents" component={UserGoingEvents} />
      <ProtectedRoute exact path="/swipeCards" component={SwipeCards} />
      <ProtectedRoute exact path="/participants/:id" component={Participants} />

      <Route exact path="/login" component={Login} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route component={HomePage} />
    </Switch>
  </BrowserRouter>
);

export default Router;
