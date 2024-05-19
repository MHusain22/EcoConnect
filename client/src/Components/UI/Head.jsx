import React from 'react'
import { Typography } from '@mui/material'

const Head = (props) => {
  return (
    <Typography variant="h3" sx={{textAlign:"center", color:"var(--var-color)", fontWeight:"600", margin:"20px 0"}} gutterBottom>
{props.children}</Typography>
  )
}

export default Head