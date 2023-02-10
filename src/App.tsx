import React from 'react';
import {
  BrowserRouter,
  Routes, Route, Link
} from 'react-router-dom'
import  './styles/App.css'
import Container from '@mui/material/Container';
import AudioPlayer from './components/AudioPlayer';
import Box from '@mui/material/Box';
import Navbar from './components/Navbar';
import Typography from '@mui/material/Typography';
import Search from './components/Search';
import AudioList from './components/AudioList';
import Home from './pages/Home';
import Playlist from './pages/Playlist';
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
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/playlist" element={<Playlist/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
