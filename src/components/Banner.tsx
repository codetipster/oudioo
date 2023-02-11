import React from 'react'
import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Image from '../assets/backdrop2.jpeg'; // Import using relative path
import landingImage from '../assets/oudioo.png'

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
        paddingTop: '15%',
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

const Banner = () => {
    const classes = useStyles()
  return (
    
    <div className={classes.root}>
        <Toolbar className={classes.banner}>
            <WhiteTextTypography variant="h3">
                Unleash the Power of Sound:<WhiteTextTypography>Discover Your Next Favorite Tune with Our Audio Streaming App.</WhiteTextTypography>
            </WhiteTextTypography>
            <IconButton>
                <img src={landingImage} className={classes.action}/>
            </IconButton>
            <WhiteTextTypography variant='h6'>click to start</WhiteTextTypography>
        </Toolbar>
    </div>
  )
}

export default Banner