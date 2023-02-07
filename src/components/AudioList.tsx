import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import AudioListItem from './AudioListItem'
import { makeStyles} from '@material-ui/core/styles';
import { Box, Typography } from '@mui/material';

const useStyles = makeStyles({
       listContainerText: {
         fontWeight: "normal",
         fontSize: "20px",
         justifyContent: "space-between"
       },
       allTrackLink: {
         paddingRight: "30px",
         textDecoration: "underline",
         
       }
    });



//This comes from server
const rows = [
    {
    "id": 1,
    "title": "Kylen",
    "image": "https://robohash.org/repellatreiciendisqui.png?size=50x50&set=set1",
    "duration": "7:02 AM",
    "Artist": "Rabat",
    "source": "NA"
  }, 
  {
    "id": 2,
    "title": "Beatriz",
    "image": "https://robohash.org/voluptatumpraesentiumsed.png?size=50x50&set=set1",
    "duration": "7:23 PM",
    "Artist": "Woofinden",
    "source": "EU"
  }, 
  {
    "id": 3,
    "title": "Aland",
    "image": "https://robohash.org/suscipitquamrerum.png?size=50x50&set=set1",
    "duration": "12:43 AM",
    "Artist": "MacIlriach",
    "source": "AF"
  }, 
  {
    "id": 4,
    "title": "Maurita",
    "image": "https://robohash.org/autemeaquo.png?size=50x50&set=set1",
    "duration": "11:36 AM",
    "Artist": "Godbald",
    "source": "SA"
  }, 
  {
    "id": 5,
    "title": "Brandtr",
    "image": "https://robohash.org/voluptatemutenim.png?size=50x50&set=set1",
    "duration": "10:45 AM",
    "Artist": "Adacot",
    "source": "EU"
  }
]


const AudioList = () => {
    const classes = useStyles()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

  return (
    <Paper sx={{ width: '100%' }}>
        <TableContainer className={classes.listContainerText} sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">

            {/* Header */}
          <TableHead >
            <TableRow >
              <TableCell align="left" colSpan={1} className={classes.listContainerText}>
                Trending Now
              </TableCell>
              <TableCell align="right" colSpan={1} className={classes.allTrackLink}>
                See all
              </TableCell>
            </TableRow>

            {/* Table Rows */}
            <TableBody> 
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {/* Render component for each audio track */}
                    <AudioListItem id={row.id} title={row.title} image={row.image} duration={row.duration} artist={row.Artist}/>
                  </TableRow>
                );
              })}
            </TableBody>
          </TableHead>
          </Table>
        </TableContainer>
        
        </Paper>
    
  )
}

export default AudioList

