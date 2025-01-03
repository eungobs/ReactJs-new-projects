import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Popup = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Important Information</DialogTitle>
      <DialogContent>
        <Typography>
          We have updated our Privacy Policy and Cookie Policy. Please review our{' '}
          <Link to="/securityterms" style={{ textDecoration: 'none', color: 'inherit' }}>
            Security Terms
          </Link>
          .
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>I Understand</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
