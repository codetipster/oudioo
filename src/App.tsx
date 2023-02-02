import React from 'react';
import  './styles/App.css'
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import AudioPlayer from './components/AudioPlayer';
import Box from '@mui/material/Box';
import Navbar from './components/Navbar';
import Typography from '@mui/material/Typography';


function App() {
  return (
    <>
    <Navbar/>
    <Container>
      <Box p={2} m={2} alignItems="center">
        <Typography variant="h4" component="h2">
        Unleash the Power of Sound:<Typography variant="h5" component='p'>Discover Your Next Favorite Tune with Our Audio Streaming App.</Typography>
        </Typography>
      </Box>
      <AudioPlayer/>
    </Container>
    </>
  );
}

export default App;
