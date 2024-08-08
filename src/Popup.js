import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

const Popup = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="popup-title"
      aria-describedby="popup-description"
    >
      <DialogTitle id="popup-title">Important Information</DialogTitle>
      <DialogContent>
        <Typography id="popup-description">
          We have updated our Privacy Policy and Cookie Policy.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          I Understand
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
