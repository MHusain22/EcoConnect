import React from 'react'
import Box from '@mui/material/Box';
import Challenges from '../Challenges/Challenges';
import Resources from '../Resources/Resources';
import Envdata from '../Envdata/Envdata';

const Home = () => {
  return (
    <div>
        
        <Box
      sx={{
        height: '91vh',
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
        <h1 style={{fontSize:"40px"}}>Welcome to the World EcoConnect</h1>
        <p> Our platform is dedicated to empowering individuals and communities to take action towards environment.</p>
      </Box>
    </Box>
    <Challenges />
    <Resources />
    <Envdata />
    </div>
  )
}

export default Home;