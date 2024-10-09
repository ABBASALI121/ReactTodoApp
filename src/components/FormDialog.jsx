import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ formData, handleSubmit, handleChange, handleClose, open, isUpdateFormToggel }) {

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{isUpdateFormToggel ? "Update User" : "Add User"}</DialogTitle>
        <DialogContent>
          <form method='post' onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Enter Your Name"
              type="text"
              fullWidth
              variant="standard"
              error={!!formData.errors.name}
              helperText={formData.errors.name}
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              error={!!formData.errors.email}
              helperText={formData.errors.email}
              value={formData.email}
              onChange={handleChange}
            />
            <DialogActions>
              <Button type="submit">{isUpdateFormToggel ? 'Update' : 'Submit'}</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}