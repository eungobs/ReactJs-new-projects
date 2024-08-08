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
          We have updated our Privacy Policy and Cookie Policy. Please review our
          <a href="https://example.com/security-terms" target="_blank" rel="noopener noreferrer">
            Security Terms
          </a>.
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
