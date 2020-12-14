import {
  createStore,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './store/reducer';

const initialState = {
  allEvents: null,
  event: {
    title: '',
    description: '',
    location: '',
    date: '',
    participants: []
  },

  participants: [
    { firstName: 'Lyuda', lastName: 'Galich' },
    { firstName: 'Lyuda', lastName: 'Galich' },
    { firstName: 'Lyuda', lastName: 'Galich' }
  ],

  user: {
    firstName: '',
    lastName: '',
    eventsCreated: 0,
    eventsVisited: 0
  },
  userCreatedEvents: [],

  isModalOpened: false,

  modalContentType: null,

  isLoading: false,
  error: null
};

const middleware = composeWithDevTools(
  applyMiddleware(thunk)
);

const store = createStore(
  rootReducer,
  initialState,
  middleware
);

export default store;
