import React from 'react'
import { Typography } from "@mui/material";

const SubHeading = (props) => {
  return (
    <Typography
      variant="h6"
      sx={{ textAlign: "center", margin: "20px 0" }}
      gutterBottom
    >
      {props.children}
    </Typography>
  )
}

export default SubHeading