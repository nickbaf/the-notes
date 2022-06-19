import { AppBar, Box, Stack, Toolbar, Typography, Skeleton } from '@mui/material';
import { useNotesQuery } from "../../generated/grapql-notes";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InsertNoteDialog from "../NewNoteComponent/InsertNoteDialog";
import style from '../../css/App.module.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:'#1A2027',
  padding: theme.spacing(3),
  textAlign: 'center'
}));

function App() {

  const { data, loading, error, refetch } = useNotesQuery();
  const notes = data?.notes;
  return (
    <Box sx={{ width: '100%' }}>
      <AppBar className={style.bar} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            The Notes
          </Typography>
          <InsertNoteDialog onSuccess={refetch} />
        </Toolbar>
      </AppBar>
      {loading ? (
        <Box className={style.skeleton} sx={{ width:'100%' }}>
        <Skeleton sx={{ height: '7em' }} animation="wave"/>
        <Skeleton sx={{ height: '7em' }} animation="wave"/>
        <Skeleton sx={{ height: '7em' }} animation="wave"/>
        <Skeleton sx={{ height: '7em' }} animation="wave"/>
      </Box>
      ) : error ? (
        <Item className={style.noNotes} style={{overflowWrap: 'break-word'}} >An error occured.</Item>
      ) : notes && notes.length ? (
        <Stack  className={style.content} spacing={5}>
        {notes?.map((note) => {
               return <Item className={style.item} style={{overflowWrap: 'break-word'}} >{note.text}</Item>;
             })}
        </Stack>
      ) : (
        <Item className={style.noNotes} style={{overflowWrap: 'break-word'}}>404 Notes not found</Item>
      )}
    </Box>
  );
}

export default App;
