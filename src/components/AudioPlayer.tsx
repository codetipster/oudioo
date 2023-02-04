import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import '../styles/AudioPlayer.css'
import AppBar from '@mui/material/AppBar';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';


const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

function AudioPlayer() {
  const [isplaying, setIsplaying] = React.useState<boolean | HTMLElement>(true);
  const [position, setPosition] = React.useState(32);
  const duration = 200; // seconds
  const theme = useTheme();
   //state to toggle playing status
  const togglePlayPause = () => {
    setIsplaying(!isplaying)
  }
  
  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
  

  return (
    <AppBar position="static" color='default' >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Big screen */}
          <GraphicEqIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> 
          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 200,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Oudioo
          </Typography> */}
          <audio src='http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg' preload='metadata' ></audio>
          <IconButton
            onClick={togglePlayPause}
            className='playPause'
          >
            {isplaying ? <PlayCircleOutlineIcon/> : <PauseCircleOutlineIcon/>}
          </IconButton>
          
          
          {/* start time */}
            <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 4,
            }}
            >
              <TinyText>{formatDuration(position)}</TinyText>
            </Box>

          {/* progress bar */}
          <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => setPosition(value as number)}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&:before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />

        {/* End time */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 4,
            
          }}
        >
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
        

          



          {/* small screen */}
          <GraphicEqIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> 
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 1,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 200,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Oudioo
          </Typography> */}

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AudioPlayer