import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

const Confirmation = ({ title, contextText }) => {
  const handleNegation = useCallback(() => {
    console.log('no');
  }, []);

  const handleConfirmation = useCallback(() => {
    console.log('yes');
  }, []);

  return (
    <>
      <DialogTitle id="form-dialog-title">{ title }</DialogTitle>
      <DialogContent>
        <DialogContentText>
          { contextText }
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
  contextText: PropTypes.string.isRequired
};

export default Confirmation;
