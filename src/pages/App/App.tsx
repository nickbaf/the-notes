import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from 'react';
import logo from './logo.svg';
import '../../css/App.css';
import { Container } from "@mui/system";
import { CssBaseline,Box, Stack} from "@mui/material";
import { useNotesQuery } from "../../generated/grapql-notes";
import AddNoteForm from "../NewNoteComponent/NewNoteComponent";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function App() {
  
  const { data, loading, error, refetch } = useNotesQuery();
  const notes = data?.notes;
  return (
  
    //   <div>
    //   <h1>
    //     <title>The Notes</title>
    //   </h1>
    //   <h2>The Notes</h2>
    //   {loading ? (
    //     <p>Fetching notes</p>
    //   ) : error ? (
    //     <p>An error occurred.</p>
    //   ) : notes && notes.length ? (
    //     <ul >
    //       {notes.map((note) => {
    //         return <li key={note.id}>{note.text}</li>;
    //       })}
    //     </ul>
    //   ) : (
    //     <p>You've got no notes.</p>
    //   )}
    //  
    // </div>
    <div>
    
    <Box sx={{ width: '80%' }}>
      <Stack spacing={2}>
      <AddNoteForm onSuccess={refetch} />
      {notes?.map((note) => {
             return <Item>{note.text}</Item>;
           })}
      </Stack>
    </Box>
</div>
  );
}

export default App;
