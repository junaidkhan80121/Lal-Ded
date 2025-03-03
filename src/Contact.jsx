import React, { useState } from 'react'
import Grid from '@mui/material/Grid2'
import { Typography, Box, Card, TextField, Button } from '@mui/material'
import './text.css';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import './components/css/Contact.css';
import axios from 'axios'

export default function Contact() {
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [desc, setDesc] = useState("");

    const handleForm = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8000/queries",
            {
                "fname":fname,
                "lname":lname,
                "email": email,
                "phone": phone,
                "query":desc
            },
            {
                headers:{secret:import.meta.env.VITE_SECRET},
            }
        )
            console.log(response.data);
        }
        catch(err){
            console.log("err: ",err);
        }



    }
  return (
    <>
        <Box sx={{backgroundImage:"url('/assets/contact-bg.jpg')",marginTop:"10vh",height:{xs:"85vh",sm:"85",md:"85vh",lg:"85vh"},backgroundSize:"cover",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <Typography className="text-2" sx={{color:"white",fontWeight:"600",fontSize:{xs:"8vw",lg:"3vw",marginBottom:"0vh"}}}>Contact Us</Typography>
            <a href="#contact"><Button variant="contained" color='primary' size='medium'>Contact Us</Button></a>
        </Box>
        <Grid container sx={{marginTop:"5vh"}}>
            <Grid size={{xs:12,sm:12,md:6,lg:6}}>
                <Box id="contact" sx={{height:{xs:"60vh",sm:"85vh",md:"100vh",lg:"80vh"},padding:{xs:"8vw",sm:"5vw",md:"5vw 0 5vw 3vw",lg:"5vw"}}}>
                    <Typography sx={{fontSize:{xs:"12vw",sm:"6vw",md:"4vw",lg:"5vw"},fontWeight:"700"}} className='text-1'>Contact Us</Typography>
                    <Typography className='text-2' sx={{mt:{xs:2},color:"gray",fontSize:{xs:"4vw",sm:"2.5vw",md:"2vw",lg:"1.2vw"}}}>Ready to plan your dream adventure? Whether you have a quick question, need personalized travel advice, or want to start crafting your itinerary, we're here to help. Email, call, or complete the form below to discover how we can solve your travel planning needs.</Typography>
                    <Typography className='text-3' sx={{mt:{xs:6},fontSize:{xs:"4vw",sm:"3vw",md:"2vw",lg:"1.1vw"}}}><a style={{display:"flex",alignItems:"center",color:"black",textDecoration:"none"}} className='text-3' href="mailto:ahsanamin1994@gmail.com"><MailIcon sx={{fontSize:{xs:"4vw",sm:"3vw",md:"2vw",lg:"1.3vw"}}}/>&ensp;AhsanAmin1994@gmail.com</a></Typography>
                    <Typography className='text-3' sx={{mt:{xs:1},fontSize:{xs:"4vw",sm:"3vw",md:"2vw",lg:"1.1vw"}}}><a style={{display:"flex",alignItems:"center",color:"black",textDecoration:"none"}} className='text-3' href="tel:+917006267930"><PhoneIcon sx={{fontSize:{xs:"4vw",sm:"3vw",md:"2vw",lg:"1.3vw"}}}/>&ensp;+917006267930</a></Typography>
                    <Box sx={{display:"flex",justifyContent:"space-between",mt:{xs:"5vw"},padding:{xs:"0vw"}}}>
                    <Box sx={{mx:{lg:2,xs:"2vw"},mt:{xs:"3vh"}}}>
                        <Typography className='text-2' sx={{textAlign:"center",fontSize:{xs:"4vw",md:"2.5vw",lg:"1.5vw"},fontWeight:"500"}}>Customer Support</Typography>
                        <Typography sx={{margin:{},textAlign:"center",fontSize:{xs:"2.7vw",md:"1.5vw",lg:"1vw"}}}>Our support team is available around the clock to address any concerns or queries you ma have.</Typography>
                    </Box>
                    <Box sx={{mx:{lg:2,xs:"2vw"},mt:{xs:"3vh"}}}>
                        <Typography className='text-2' sx={{textAlign:"center",fontSize:{xs:"4vw",md:"2.5vw",lg:"1.5vw"},fontWeight:"500"}}>Feedback & Queries</Typography>
                        <Typography sx={{margin:{},textAlign:"center",fontSize:{xs:"3vw",md:"1.5vw",lg:"1vw"}}}>Our support team is available around the clock to address any concerns or queries you ma have.</Typography>
                    </Box>
                </Box>
                </Box>
            </Grid>
            <Grid size={{xs:12,sm:12,md:6,lg:6}}>
                <Box sx={{padding:"4vw",mt:{xs:5}}}>
                    <Card sx={{p:4,borderRadius:"5%",height:{lg:"80vh"}}}>
                        <Typography sx={{fontSize:{xs:"7vw",lg:"2.5vw"},fontWeight:"700",mb:1}} className='text-1'>Get in Touch</Typography>
                        <Typography sx={{fontSize:{xs:"4vw",lg:"1vw"},fontWeight:"700",mb:1}} className='text-1'>You can reach us anytime</Typography>
                        <form onSubmit={handleForm}>
                            <TextField label='First Name' size='medium' sx={{p:1,mb:1,borderRadius:"50%"}} required="required" onChange={(e)=>setFName(e.target.value)}/>
                            <TextField label='Last Name' size='medium' sx={{p:1}} onChange={(e)=>setLName(e.target.value)} />
                            <TextField size='medium' sx={{p:1}} placeholder='Email' label='Email' fullWidth onChange={(e)=>setEmail(e.target.value)} />
                            <TextField size='medium' sx={{p:1}} label='Phone Number' type='number' required='required' fullWidth onChange={(e)=>setPhone(e.target.value)} />
                            <TextField size='large' sx={{p:1,mb:3}} rows={4} multiline label='How Can We Help?' required="required" fullWidth onChange={(e)=>setDesc(e.target.value)} />
                            <Button type='submit' variant='contained' color='primary' size='large' fullWidth>Submit</Button>                            
                        </form>
                    </Card>
                </Box>
            </Grid>
            <Grid size={{xs:12,sm:12,md:12,lg:6}} sx={{height:{lg:"90vh"}}}>
                <Box sx={{padding:"2vw",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <iframe className='maps' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.598390383595!2d74.77057207486054!3d34.10542741492173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e19b996ef3bb6b%3A0xf48e1bff2e9d4dd!2sNoorbagh%20location!5e0!3m2!1sen!2sin!4v1740635509212!5m2!1sen!2sin"></iframe>
                </Box>
            </Grid>
            <Grid size={{xs:12,sm:12,md:6,lg:6}}>
                <Box sx={{padding:{xs:"5vw"},mt:{xs:"5vh"}}}>
                    <Typography className='text-1' sx={{fontSize:{xs:"5vw",lg:"2vw"},fontWeight:"600"}}>Our Location</Typography>
                    <Typography className='text-1' sx={{fontSize:{xs:"6vw",sm:"3vw",md:"2vw",lg:"2.5vw"},fontWeight:"600"}}>Connecting Near and Far</Typography><br/>
                    <Typography className='text-2' sx={{mt:{xs:2},fontSize:{xs:"6vw",lg:"2vw"},fontWeight:"500"}}>Office</Typography>
                    <Typography className='text-3' sx={{fontSize:{xs:"4vw",sm:"3vw",lg:"1.3vw"},color:"gray"}}>Lal Ded Tour and Travels, <br/>Bhagwanpora, Noorbagh,<br/>Near Hosptal Doad <br/>Srinagar, 190001, <br/>Jammu & Kashmir.</Typography>
                </Box>
            </Grid>
        </Grid>
    </>
  )
}
