import React from 'react'
import '../styles/App.css'
import { Box, IconButton, Toolbar, Typography,  ThemeProvider, createTheme } from '@mui/material';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Image from '../assets/backdrop2.jpeg'; // Import using relative path
import landingImage from '../assets/oudioo.png'
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Login from '../pages/Login';
import { Link } from 'react-router-dom';

   const useStyles = makeStyles({
      root: {
       minHeight: "100vh",
       minWidth: '100%',
       backgroundImage: `url(${Image})`,
       backgroundRepeat: "no-repeat",
       backgroundSize: "cover"
      },
      action: {
        filter: 'invert(70%)',
        width:  '80px',
        height: '75px',
        "&:hover": {
            filter: 'invert(100%)'
          }
        
      },
      banner: {
        margin: '0 auto',
        paddingTop: '17%',
        width: '70%',
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
      },
      text: {
        color: '#fffff'
      } 
    });


    const WhiteTextTypography = withStyles({
        root: {
          color: "#FFFFFF"
        }
      })(Typography);
    
     //overides custom styling for  drawer
      const theme = createTheme({
        palette: {
          text: {
            primary: '#fffff',
            secondary: '#fffff',
          }, 
        },
      });

const Banner = () => {
    const classes = useStyles()
    const [state, setState] = React.useState({left: false});
    const [text, setText] = React.useState('')
    const [id, setId] = React.useState()
    type Anchor = 'left'
      
      const toggleDrawer =
      (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
  
        setState({ ...state, [anchor]: open });
      };

     //Handle sidebar menu onclick
      const handleNavClick = (text: any, index: any) => {
        const clickHandler =() => {
          console.log('hello', text, index)
          setText(text)
          setId(index)
        }
        return clickHandler
      }

      
      const list = (anchor: Anchor) => (
        <ThemeProvider theme={theme}>
        <Box
          sx={{ width: anchor === 'left' || anchor === 'bottom' ? 'auto' : 250 , backgroundColor:"#203054", minHeight:"100vh", color: "#fffff"}}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List >
            {['Login', 'Signup','Documentation'].map((text, index) => (
              <ListItem key={text} sx={{color:"#fffff", textDecoration: "none"}}>
                <ListItemButton onClick={handleNavClick({text}, {index})} >
                  <ListItemIcon >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                   <Link to={text === 'Login' ? '/login' : (text === 'Signup' ? '/signup' : (text === 'Documentation' ? '/documentation' : '/'))} className='link-text'><ListItemText secondary={text}/></Link> 
                </ListItemButton >
              </ListItem>
            ))}
          </List>
          {/* <Divider /> */}
        </Box>
        </ThemeProvider>
      );
    
  return (

    <div className={classes.root}>
        <Toolbar className={classes.banner}>

            <WhiteTextTypography variant="h3">
                Unleash the Power of Sound:<WhiteTextTypography>Discover Your Next Favorite Tune with Our Audio Streaming App.</WhiteTextTypography>
            </WhiteTextTypography>

            <IconButton>
                {(['left'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                  <img src={landingImage} className={classes.action} onClick={toggleDrawer(anchor, true)}/>
                    <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    >
                    {list(anchor)}
                    </Drawer>
                </React.Fragment>
                ))}
            </IconButton>
            <WhiteTextTypography variant='h6'>click to start</WhiteTextTypography>
        </Toolbar>
    </div>  
  )
}

export default Banner