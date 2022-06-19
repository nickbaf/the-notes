import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useInsertNoteMutation } from '../../generated/grapql-notes';





const AddNoteForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const [text, setContent] = useState('');
  
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    };
  
    const [addNote, { loading }] = useInsertNoteMutation();
  
    const handleSubmit = async () => {
      try {
        await addNote({ variables: { input: { text: text } } });
        setContent('');
        onSuccess();
      } catch (e) {
        alert('An error occurred, please try again.');
      }
    };
  
    return (
        <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth inputProps={{ maxLength: 2 }} label="Please type your note here." id="fullWidth" />
      <Button type="submit" 
      onClick={()=>handleSubmit}
        variant="contained"        
         disabled={loading}>
          Add Note
        </Button>
    </Box>
    //   <form onSubmit={handleSubmit}>
    //     <textarea
    //     //   className={styles.contentTextarea}
    //       value={text}
    //       onChange={handleChange}
    //       maxLength={180}
    //     />
    //     <button type="submit" 
    //     // className={styles.button}
    //      disabled={loading}>
    //       Add Note
    //     </button>
    //   </form>
    );
  };



export default AddNoteForm;

