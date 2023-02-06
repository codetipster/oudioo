import { Box } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";

const useStyles = makeStyles({
    searchWrapper: {
      position: 'relative',
      display: 'flex',
      minWidth: '100px'
      
    },
    searchField: {
      border: '1px solid grey',
      borderRadius: '5px',
      height: '40px',
      width: '100%',
      padding: '2px 23px 2px 30px',
      outline: '0',
      fontSize: '20px',
      backgroundColor: '#f5f5f5',
      '&:hover': {
        border: '1.5px solid #009688',
     },
     '&:focus': {
      border: '1.5px solid #009688',
     },
    },
    searchIcon: {
      position: 'absolute',
      top: '10px',
      left: '8px'
    }
  });

const Search = () => {
  const classes = useStyles()
  //Get user search query
  const [query, setQuery] = useState("")

  return (
    <Box className={classes.searchWrapper}>
        <SearchIcon className={classes.searchIcon}/>
        <input className={classes.searchField}  type='text' placeholder='Search' onChange={event => setQuery(event.target.value)}/> 
    </Box>
  )
}

export default Search