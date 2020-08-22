import {
  OPEN_MODAL,
  CLOSE_MODAL
} from './actionTypes';

const defaultState = {
  isOpened: false,
  contentType: '',
  contentData: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        isOpened: true,
        contentType: action.payload.contentType,
        contentData: action.payload.contentData
      };
    case CLOSE_MODAL:
      return {
        ...defaultState
      };
    default: return state;
  }
};
