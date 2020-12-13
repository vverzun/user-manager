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
  userEvents: [],

  isModalOpened: false,

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
