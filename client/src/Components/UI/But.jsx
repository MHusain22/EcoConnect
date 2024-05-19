import React from 'react'
import {Button} from "@mui/material";

const But = (props) => {
  return (
    <Button sx={{background:"var(--var-color)",color:"white","&:hover": {
      backgroundColor: "var(--var-hover)",
    }}}>{props.children}</Button>
  )
}

export default But