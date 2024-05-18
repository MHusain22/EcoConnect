import React from 'react'
import Navbar from './Navbar/Navbar'
// import {bg} from '../Images/bg.jpg'
import Box from '@mui/material/Box';


const Home = () => {
  return (
    <div>
        
        <Box
      sx={{
        height: '90vh',
        backgroundImage: `
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(/bg.jpg)
      `,
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ textAlign: 'center', color:"white"}}>
        {/* Your centered text */}
        <h1>Centered Text</h1>
        <p>This text is centered both horizontally and vertically.</p>
      </Box>
    </Box>
    </div>
  )
}

export default Home;