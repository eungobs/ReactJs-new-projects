import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

const Popup = ({ open, onClose }) => {
  const handleLinkClick = (e) => {
    e.preventDefault();
    window.location.href = '/securityterms'; // Internal navigation
  };

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
          <a href="/securityterms" onClick={handleLinkClick}>
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
