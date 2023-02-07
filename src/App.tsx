import React from 'react';
import  './styles/App.css'
import Container from '@mui/material/Container';
import AudioPlayer from './components/AudioPlayer';
import Box from '@mui/material/Box';
import Navbar from './components/Navbar';
import Typography from '@mui/material/Typography';
import Search from './components/Search';
import AudioList from './components/AudioList';
//import { makeStyles, createStyles } from '@material-ui/core/styles';
//yarn add @material-ui/core@latest @material-ui/styles@latest

// const useStyles = makeStyles({
//   appContainer: {
//     backgroundColor: "rgba(193, 14, 14, 0.4)"
//   }
// });



function App() {
  // const classes = useStyles()
  return (
    <>
    <Navbar/>
    {/* <Typography variant="h4" component="h2">
        Unleash the Power of Sound:<Typography variant="h5" component='p'>Discover Your Next Favorite Tune with Our Audio Streaming App.</Typography>
    </Typography> */}
    <Container >
      <Box p={2} m={2} alignItems="center">
        <Typography variant="h4" component="h2">
        Unleash the Power of Sound:<Typography variant="h5" component='p'>Discover Your Next Favorite Tune with Our Audio Streaming App.</Typography>
        </Typography>
      </Box>
      <Search/>
      <AudioList/>
      <AudioPlayer/>
    </Container>
    </>
  );
}

export default App;
