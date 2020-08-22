import {
  OPEN_MODAL,
  CLOSE_MODAL
} from './actionTypes';

export const openModal = (contentType, contentData = null) => ({
  type: OPEN_MODAL,
  payload: {
    contentType,
    contentData
  }
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});

