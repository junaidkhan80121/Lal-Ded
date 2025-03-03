import React from 'react'
import Grid from '@mui/material/Grid2'
import {Typography, Box} from '@mui/material';
import './text.css';
import './components/css/About.css';

export default function About() {
  return (
    <>
      <Grid container sx={{height:{},mt:"10vh",padding:"5vw"}} spacing={10}>
        <Grid size={{xs:12,sm:12,md:6,lg:6}} >
            <Box>
                <Typography className='text-1' sx={{fontSize:{xs:"8vw",lg:"3.2vw"},fontWeight:"700"}}>
                    About Us
                </Typography>
                <Typography className='text-2' sx={{marginTop:"5vh",lineHeight:'3.5vh',color:"gray",mt:{lg:3},textAlign:"justify",fontSize:{xs:"3.5vw",sm:"3vw",lg:"1.1vw"}}}>
                    At Lal Ded Tour & Travels, we are dedicated to making your travel experiences smooth, memorable, and enjoyable. Based in Srinagar, Jammu & Kashmir, we specialize in providing personalized travel solutions, whether you're exploring the scenic beauty of Kashmir or planning trips to other destinations.
                    With a focus on customer satisfaction, reliability, and local expertise, our team ensures that every journey is comfortable and hassle-free. From transportation and accommodation bookings to guided tours and travel assistance, we are here to cater to all your travel needs.
                    Whether you’re planning a family vacation, a honeymoon getaway, or a group tour, Lal Ded Tour & Travels is your trusted travel partner. Let us help you discover the charm and beauty of incredible destinations with ease and comfort.
                </Typography>
            </Box>
        </Grid>
        <Grid size={{xs:12,sm:12,md:6,lg:6}} sx={{}}>
            <Box>
                <img className='about-img' src="/assets/contact-us.svg"/>
            </Box>
        </Grid>
      </Grid>
    </>
  )
}
