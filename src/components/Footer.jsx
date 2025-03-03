import Grid from '@mui/material/Grid2'
import React from 'react'
import {Box, Typography} from '@mui/material';
import '../text.css';
import {Link} from 'react-router-dom';
import './css/Footer.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';

export default function Footer() {
  return (
    <>
        <Grid container sx={{py:{lg:"3vw"},px:{lg:"5vw"}}}>
            <Grid size={{xs:12,sm:4,md:4,lg:4}}>
                <Box sx={{pr:{lg:15},pl:{xs:3},pt:{xs:3},display:{lg:"flex"},justifyContent:{lg:"center"}}}>
                    <img className="logo-img" src="/logo.png" alt="logo" />
                    <Typography sx={{fontSize:{lg:"2vw"},fontWeight:"700"}} className="logo">Lal Ded</Typography>
                </Box>
            </Grid>
            <Grid size={{xs:12,sm:4,md:4,lg:4}}>
            <Box sx={{mt:{xs:5},pl:{xs:3}}}>
                    <ul>
                        <Link className='text-3 footer-links' to='/'><Typography className="text-2" sx={{fontSize:{xs:"4vw",sm:"2.3vw",md:"2vw",lg:"1.1vw"},mt:{sm:1}}}>•&ensp;Home</Typography></Link>
                        <Link className='text-3 footer-links' to='/about'><Typography className="text-2" sx={{fontSize:{xs:"4vw",sm:"2.3vw",md:"2vw",lg:"1.1vw"},mt:{sm:1}}}>•&ensp;About Us</Typography></Link>
                        <Link className='text-3 footer-links' to='/contact'><Typography className="text-2" sx={{fontSize:{xs:"4vw",sm:"2.3vw",md:"2vw",lg:"1.1vw"},mt:{sm:1}}}>•&ensp;Contact Us</Typography></Link>
                    </ul>
                </Box>
            </Grid>
            <Grid size={{xs:12,sm:4,md:4,lg:4}}>
                <Box sx={{mt:{xs:5},pl:{xs:3}}}>
                    <ul>
                    <Box sx={{height:"5vh",display:{lg:"flex"},alignItems:"center"}}><a href="https://www.instagram.com/wani_handicrafts?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" className='text-3 footer-links'><Typography className="text-2" sx={{fontSize:{xs:"4vw",sm:"2.3vw",md:"2vw",lg:"1.1vw"},mt:{sm:1}}}>•&ensp;Instagram&ensp;<InstagramIcon sx={{fontSize:{xs:"3vw",sm:"1.5vw",md:"1.5vw",lg:"1vw"}}}/></Typography></a></Box>
                    <Box sx={{height:"5vh",display:{lg:"flex"},alignItems:"center"}}><a href="https://www.facebook.com/ahsan.wani.982" target='_blank' className='text-3 footer-links'><Typography className="text-2" sx={{fontSize:{xs:"4vw",sm:"2.3vw",md:"2vw",lg:"1.1vw"},mt:{sm:1}}}>•&ensp;Facebook&ensp;<FacebookIcon sx={{fontSize:{xs:"3vw",sm:"1.5vw",md:"1.5vw",lg:"1vw"}}}/></Typography></a></Box>
                    <Box sx={{height:"5vh",display:{lg:"flex"},alignItems:"center"}}><a className='text-3 footer-links' href="mailto:ahsanamin1994@gmail.com"><Typography className="text-2" sx={{fontSize:{xs:"4vw",sm:"2.3vw",md:"2vw",lg:"1.1vw"},mt:{sm:1}}}>•&ensp;AhsanAmin1994@gmail.com&ensp;<MailIcon sx={{fontSize:{xs:"3vw",sm:"1.5vw",md:"1.5vw",lg:"1vw"}}}/></Typography></a></Box>
                    <Box sx={{height:"5vh",display:{lg:"flex"},alignItems:"center"}}><a className='text-3 footer-links' href="tel:+917006267930"><Typography className="text-2" sx={{fontSize:{xs:"4vw",sm:"2.3vw",md:"2vw",lg:"1.1vw"},mt:{sm:1}}}>•&ensp;+917006267930&ensp;<PhoneIcon sx={{fontSize:{xs:"3vw",sm:"1.5vw",md:"1.5vw",lg:"1vw"}}}/></Typography></a></Box>
                    </ul>
                </Box>
            </Grid>
            
        </Grid><br/><br/>
        <Typography className='text-2' sx={{textAlign:"center",fontSize:{xs:"2.5vw",sm:"",md:"",lg:"1vw"}}}>&#169; 2025 Lal Ded Tour and Travels.</Typography>
    </>
  )
}
