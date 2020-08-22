import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { closeModal } from '../../containers/Modal/actions';
import { deleteExistingUser } from '../../containers/Manager/actions';

const Confirmation = ({ title, contentText, contentData }) => {
  const { id } = contentData;

  const dispatch = useDispatch();

  const handleNegation = useCallback(() => {
    dispatch(closeModal());
  }, []);

  const handleConfirmation = useCallback(() => {
    dispatch(closeModal());
    dispatch(deleteExistingUser(id));
  }, []);

  return (
    <>
      <DialogTitle id="form-dialog-title">{ title }</DialogTitle>
      <DialogContent>
        <DialogContentText>
          { contentText }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNegation}>
          NO
        </Button>
        <Button onClick={handleConfirmation}>
          YES
        </Button>
      </DialogActions>
    </>
  );
};

Confirmation.propTypes = {
  title: PropTypes.string.isRequired,
  contentText: PropTypes.string.isRequired,
  contentData: PropTypes.exact({
    id: PropTypes.number
  }).isRequired
};

export default Confirmation;
