import React from "react";
import { Box, BoxProps, Grow } from "@material-ui/core";


export interface GrowListProps extends BoxProps {
  interval?: number;
}

export function GrowList(props: GrowListProps) {
  const { interval = 200, children, ...rest } = props;

  return (
    <Box {...rest}>
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child) ? (
          <Grow in timeout={(index + 1) * interval}>
            {child}
          </Grow>
        ) : null
      )}
    </Box>
  );
}