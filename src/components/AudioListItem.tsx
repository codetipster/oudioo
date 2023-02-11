import * as React from 'react';
import {
    Link
 } from 'react-router-dom'
import { Card, Box, Typography, IconButton } from '@mui/material'
import { makeStyles} from '@material-ui/core/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// const useStyles = makeStyles({
//     card: {
//         //backgroundColor: "#000000",
//         padding: "5px",
//         margin: "4px",
//         width: "100%",
//         borderRadius: "5px",
//         //color: "white",
//         display: "flex",
        
        
//     },
//     box: {
//         borderRadius: "50%",
//         paddingLeft: "20px"
//     }
// });


const AudioListItem = (props: {id: any, title: String, image: any, duration:String, artist:String}) => {
    //const classes = useStyles()
    const [isfavorite, setIsfavorite] = React.useState<boolean | HTMLElement>(true);
    //Toggle favorite
    const togglePlayPause = () => {
        setIsfavorite(!isfavorite)
    }
  return (
    <Box sx={{display: "flex", paddingTop: "8px", width: "95%", marginTop:"4px", marginLeft:"auto", marginRight: "auto", justifyContent:"space-around"}}>
        <Typography sx={{ fontSize: '18px', fontWeight: "bold", color: "#c2bebe", width: "5%", textAlign:"center", paddingTop:"10px", margin: "2px"}}>
            0{props.id}
        </Typography>
        <img src={props.image} /> 
        <Box sx={{ minWidth: "35%"}}>
            <Typography sx={{fontSize:"18px"}}>
            <Link to={`/tracks/${props.id}`}>{props.title}</Link>
            </Typography>
            <Typography sx={{fontSize:"13px", color:"#898787"}}>
                {props.artist}
            </Typography>
        </Box>
        <Typography sx={{ minWidth:"6%", textAlign:"center", paddingTop: "15px", color:"#c2bebe", fontSize:"12px"}}>
            {props.duration}
        </Typography>
        <Box sx={{minWidth: "15%", justifyContent:"space-between", alignItems: "center", display:"flex"}}>
            <IconButton
                onClick={togglePlayPause}   
            >
                {isfavorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
            </IconButton>
            <MoreHorizIcon />
        </Box>
    </Box>
  )
}

export default AudioListItem