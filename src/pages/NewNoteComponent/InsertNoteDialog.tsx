import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useInsertNoteMutation } from '../../generated/grapql-notes';


const InsertNoteDialog: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const [text, setContent] = useState('');
    const [open, setOpen] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleOpenSnack = () => {
        setOpenSnack(true);
      };
    
    const handleCloseSnack = () => {
        setOpenSnack(false);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
      };

    const [addNote] = useInsertNoteMutation();
  
    const handleSubmit = async () => {
      try {
        await addNote({ variables: { input: { text: text } } });        
        setContent('');
        onSuccess();
        handleOpenSnack();
        handleClose();
      } catch (e) {
        alert('An error occurred, please try again.');
      }
    };
  
    return (
        <div>
        <Snackbar open={openSnack} 
        onClose={handleCloseSnack} 
        autoHideDuration={6000}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
           }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Your note is saved!
        </Alert>
      </Snackbar>
        <Button color="inherit" onClick={handleClickOpen} >Add Note</Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your note. You can add up to 180 characters.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="(max 180 characters)"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            inputProps={{ maxLength: 180 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      </div>)
};
export default InsertNoteDialog;

