import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './App';

//import { makeStyles, createStyles } from '@material-ui/core/styles';
// yarn add @material-ui/core@latest @material-ui/styles@latest

// const useStyles = makeStyles({
//   appContainer: {
//     backgroundColor: "rgba(193, 14, 14, 0.4)"
//   }
// });

// const classes = useStyles()



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode >
    <App />
  </React.StrictMode>
);


