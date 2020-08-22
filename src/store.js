import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userManagerReducer from './containers/Manager/reducer';
import modalReducer from './containers/Modal/reducer';

const initialState = {};

const middleware = composeWithDevTools(
  applyMiddleware(thunk)
);

const rootReducer = combineReducers({
  userManager: userManagerReducer,
  modal: modalReducer
});

const store = createStore(
  rootReducer,
  initialState,
  middleware
);

export default store;
