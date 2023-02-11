import * as React from 'react';
import Paper from '@mui/material/Paper';

// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';

import AudioListItem from './AudioListItem'
import { makeStyles} from '@material-ui/core/styles';
import { Box, Typography } from '@mui/material';

//This comes from server
const rows = [
    {
    "id": 1,
    "title": "Kylen for nations",
    "image": "https://robohash.org/repellatreiciendisqui.png?size=50x50&set=set1",
    "duration": "07:02",
    "Artist": "Rabat",
    "source": "NA"
  }, 
  {
    "id": 2,
    "title": "Beatriz and the children of  yo",
    "image": "https://robohash.org/voluptatumpraesentiumsed.png?size=50x50&set=set1",
    "duration": "07:23",
    "Artist": "Woofinden",
    "source": "EU"
  }, 
  {
    "id": 3,
    "title": "Aland  and the beast",
    "image": "https://robohash.org/suscipitquamrerum.png?size=50x50&set=set1",
    "duration": "12:43 ",
    "Artist": "MacIlriach",
    "source": "AF"
  }, 
  {
    "id": 4,
    "title": "Maurita in galactica",
    "image": "https://robohash.org/autemeaquo.png?size=50x50&set=set1",
    "duration": "11:36",
    "Artist": "Godbald",
    "source": "SA"
  }, 
  {
    "id": 5,
    "title": "Brandtr rock me",
    "image": "https://robohash.org/voluptatemutenim.png?size=50x50&set=set1",
    "duration": "10:45",
    "Artist": "Adacot",
    "source": "EU"
  }
]


const AudioList = () => {
    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // const handleChangePage = (event: unknown, newPage: number) => {
    //     setPage(newPage);
    // };
    
    // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // };

  return (
    
<Paper sx={{ width: '100%' }}>
<Box sx={{ maxHeight: 440 }}>
  <Box>

    {/* Header */}
  <Box>
    <Box sx={{display: "flex", width: "100%", justifyContent: "space-between", border: '1px solid grey'}}>
      <Typography sx={{fontSize:"25px", padding:"20px"}}>
        Trending right now
      </Typography>
      <Typography sx={{padding: "25px", textDecoration: "underline", color:"#39268d"}}>
        See all
      </Typography>
    </Box>

    {/* Table Rows */}
    {rows
      .map((row) => {
        return (
          <Box  key={row.id} sx={{'&:hover': {
            backgroundColor: '#f4efef',
          }}}>
            {/* Render component for each audio track */}
            <AudioListItem id={row.id} title={row.title} image={row.image} duration={row.duration} artist={row.Artist}/>
          </Box>
        );
      })}  
  </Box>
  </Box>
</Box>
{/* Pagination */}
{/* <TablePagination
rowsPerPageOptions={[10, 25, 100]}
component="div"
count={rows.length}
rowsPerPage={rowsPerPage}
page={page}
onPageChange={handleChangePage}
onRowsPerPageChange={handleChangeRowsPerPage}
/> */}
</Paper>
    
  )
}

export default AudioList

