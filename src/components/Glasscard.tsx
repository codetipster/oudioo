import React from "react";
import { Box, BoxProps} from '@mui/material';
import { makeStyles} from '@material-ui/core/styles';
import clsx from "clsx";
import color from 'color'



const useStyles = makeStyles({
  glass: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    backgroundImage: `linear-gradient(to bottom right, rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0))`,
    backdropFilter: 'blur(7px)',
    boxShadow: "10px 10px 10px rgba(30, 30, 30, 0.1)",
    borderRadius: 20,
    borderLeft: "solid 1px rgba(255, 255, 255, 0.3)",
    borderTop: "solid 1px rgba(255, 255, 255, 0.8)",
  }
});

export interface GlassCardProps extends BoxProps {}
  

export function GlassCard(props: GlassCardProps) {
  const {...rest} = props;
  
  const classes = useStyles();

  return (
    <Box 
      className={classes.glass}
      {...rest}
    />
  );
}