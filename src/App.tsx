import React from 'react';
import Container from '@mui/material/Container';
import AudioPlayer from './components/AudioPlayer';
import Navbar from './components/Navbar';


function App() {
  return (
    <>
    <Navbar/>
    <Container >
      <h1>hello world!</h1>
      <AudioPlayer/>
    </Container>
    </>
  );
}

export default App;
