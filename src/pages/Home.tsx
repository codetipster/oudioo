import Navbar from '../components/Navbar'
import Search from '../components/Search'
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
  },
  container: {
    width: '100%',
    height: '100%',
    aligntItems: 'center',
    paddingTop: '10%',
  } 
});

const Home = () => {
  const classes=useStyles()

  return (
    <div className={classes.root}>
      <Navbar/> 
      <Container className={classes.container}>
      <Search/>
      </Container>
    </div>
  )
}

export default Home