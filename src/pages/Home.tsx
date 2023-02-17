import React from 'react'
import Navbar from '../components/Navbar'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Image from '../assets/backdrop2.jpeg';
import { Container } from '@mui/system';

const useStyles = makeStyles({
  root: {
   minHeight: "100vh",
   minWidth: '100%',
   backgroundImage: `url(${Image})`,
   backgroundRepeat: "no-repeat",
   backgroundSize: "cover"
  },
  text: {
    color: '#fffff'
  } 
});

const Home = () => {
  const classes=useStyles()
  return (
    <div className={classes.root}>
      <Navbar/>
      <Container maxWidth="xl" >
        Home
      </Container>

    </div>
  )
}

export default Home