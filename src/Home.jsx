import React from "react";
import Carousel from "./components/carousel";
// import "./components/css/Home.css";
import Grid from "@mui/material/Grid2";
import CountUp from "react-countup";
import { Paper, Card, Typography, Box, Button } from "@mui/material";
import TourIcon from '@mui/icons-material/Tour';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <>
      {/* <Carousel /> */}
      <Box sx={{py:{xs:"10vw",lg:"3vw"},px:"5vw",height:{xs:"65vh",lg:"85vh"},mt:{lg:"5vh"}}}>
        <Grid container spacing={3}>
          <Grid size={{xs:12,sm:12,md:12,lg:6}}>
            <Box sx={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",height:"80vh"}}>
              <Typography className="text-1" sx={{lineHeight:{lg:'10vh'},fontSize:{xs:"7vw",md:"5vw",lg:"3.2vw"},fontWeight:"800"}}>
                Book Your Trip And Travel With Us Today.
              </Typography>
              <Typography sx={{fontSize:{lg:"1.1vw"},color:"gray",mt:{xs:3}}} className="text-3">
              Your journey to unforgettable experiences starts here. We make booking domestic, international, and local trips effortless and affordable. Say goodbye to travel planning stress and hello to incredible value. With our expertly curated options and competitive prices, you can explore the world without compromising your budget. Start planning your adventure today!
              </Typography>
              <Box sx={{pl:{xs:"0vw",md:"",sm:"8vw",lg:"2vw"},mt:{xs:4,lg:4},width:{xs:"100vw",lg:"50vw"},display:{xs:"flex"}}}>
                <Link to='/contact'><Button variant='contained' size='large' color="primary" sx={{ml:{lg:4,xs:2}}} >
                  Get Started
                </Button></Link>
                <Link to='/contact'><Button variant='outlined' size='large' color="primary" sx={{ml:{lg:4,xs:2}}} >
                  Book Today
                </Button></Link>
              </Box>
            </Box>
          </Grid>
          <Grid size={{xs:12,sm:12,md:6,lg:6}}>
            <Box sx={{height:"80vh",display:{lg:"flex",xs:"none"}}}>
              <img style={{width:"40vw",height:"auto"}} src='/assets/trip.svg' alt='travel'/>
            </Box>  
          </Grid>
        </Grid>
      </Box>
      <Box sx={{mt:{xs:"15vh"},height:{xs:"85vh",sm:"100vh",md:"90vh",lg:"90vh",margin:"0 10vw 0 10vw"},textAlign:"center"}}>
        <Typography
          className="text-1"
          sx={{ fontWeight: "700", marginBottom: "3vh", marginTop: "5vh", fontSize:{xs:"5.2vw",sm:"5vw",lg:"2.5vw"}}}
        >
          WHY CHOOSE US
        </Typography>
        <Typography variant="h3" className="text-2" sx={{ fontWeight: "700", fontSize:{xs:"7vw",sm:"6vh",lg:"3vw"} }}>
          Leading the Way in Responsible Tourism Since 2005
        </Typography>
        <Box sx={{ margin: {lg:"5vh 10vw 5vh 10vw"} }}>
          <Typography className="text-2" sx={{mt:{xs:2},fontSize:{xs:"3.8vw",sm:"3vw",md:"2vw",lg:"1.25vw"}}}>
            At Reality Tours & Travel, we believe tourism should be a force for
            local development. That’s why we direct 80% of our post-tax profits
            from all tours to fund community projects — a social impact model
            recognized with awards for sustainable tourism. While making a
            positive impact, our guests can discover the real heart of India
            through authentic, thought-provoking tours led by our well-trained,
            dedicated local guides.
          </Typography>
        </Box>
        <Button sx={{mt:{xs:5}}} variant="contained" color="primary">
          Discover More
        </Button>
        <Box
          sx={{
            marginTop: "10vh",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Box>
            <Typography sx={{fontSize:{xs:"8vw",lg:"3vw"},fontWeight:"700"}} variant="h3" className="text-1">
              <CountUp duration={3} end={50} />+
            </Typography>
            <Typography sx={{fontSize:{xs:"2.5vw",lg:"1.5vw"}}} className="text-2">Local Destinations</Typography>
          </Box>
          <Box>
            <Typography sx={{fontSize:{xs:"8vw",lg:"3vw"},fontWeight:"700"}} variant="h3" className="text-1">
              <CountUp duration={3} end={20} />+
            </Typography>
            <Typography  sx={{fontSize:{xs:"2.5vw",lg:"1.5vw"}}} className="text-2">Foreign Destinations</Typography>
          </Box>
          <Box>
            <Typography sx={{fontSize:{xs:"8vw",lg:"3vw"},fontWeight:"700"}} variant="h3" className="text-1">
              <CountUp duration={3} end={100} />+
            </Typography>
            <Typography sx={{fontSize:{xs:"2.5vw",lg:"1.5vw"}}} className="text-2">Satisfied Customers</Typography>
          </Box>
        </Box>
      </Box>
      <Box className="desc-box-2" sx={{ paddingTop: {sm:"30vh",md:"50vh",lg:"15vh"},height:{xs:"90vh",lg:"100vh"}}}>
        <Box sx={{marginTop:{}}}>
          <Typography sx={{textAlign:"center",fontWeight:"600",fontSize:{xs:"5vw",md:"4vw",lg:"2.5vw"}}} className="text-1">
            WHAT WE DO
          </Typography>
          <Typography variant="h3" className="text-2" sx={{ fontWeight: "700", fontSize:{xs:"7vw",md:"5.5vw",lg:"3vw"},textAlign:"center",mt:{lg:"4vh"}}}>
            Tailored Solutions for Every Traveller.
          </Typography>
        </Box>
        <Grid container sx={{mt:{xs:"12vh",lg:"10vh"}}} spacing={{xs:3}}>
          <Grid size={{xs:12,sm:12,md:4,lg:4}}>
          <Card sx={{padding:{xs:"5vw",lg:"1vw"},mx:{sm:4},margin:{lg:"0 1vw 0 3vw"}}}>
              <TourIcon sx={{fontSize:{xs:"7vw",lg:"3.5vw"},marginBottom:"2vh",color:"#6d62ff"}}/>
              <Typography sx={{fontSize:{xs:"4.5vw",md:"3vw",lg:"1.5vw"},fontWeight:"600",paddingBottom:"5vh"}} className="text-1">Multi-Day Tours</Typography>
              <Typography sx={{fontSize:{xs:"3vw",md:"2vw",lg:"1.1vw"}}} className="text-3">
              Explore different parts of Kashmir by joining one of our small-group Shared Tours, or enjoy personalised experiences with family and friends on our Private Tours.
              </Typography>
            </Card>
          </Grid>
          <Grid size={{xs:12,sm:12,md:4,lg:4}}>
          <Card sx={{padding:{xs:"5vw",lg:"1vw"},mx:{sm:4},margin:{lg:"0 1vw 0 1vw"}}}>
              <TravelExploreIcon sx={{fontSize:{xs:"7vw",lg:"3.5vw"},marginBottom:"2vh",color:"#6d62ff"}}/>
              <Typography sx={{fontSize:{xs:"4.5vw",md:"3vw",lg:"1.5vw"},fontWeight:"600",paddingBottom:"5vh"}} className="text-1">International Trips</Typography>
              <Typography sx={{fontSize:{xs:"3vw",md:"2vw",lg:"1.1vw"}}} className="text-3">
              Enjoy short, immersive Srinagar Tours or Outskirts of Srinagar Tours, ranging from a few hours to a full day-perfect for quick experiences or filling gaps in your schedule.
              </Typography>
            </Card>
          </Grid>
          <Grid size={{xs:12,sm:12,md:4,lg:4}}>
            <Card sx={{padding:{xs:"5vw",lg:"1vw"},mx:{sm:4},margin:{lg:"0 3vw 0 1vw"}}}>
              <ModeOfTravelIcon sx={{fontSize:{xs:"7vw",lg:"3.5vw"},marginBottom:"2vh",color:"#6d62ff"}}/>
              <Typography sx={{fontSize:{xs:"4.5vw",md:"3vw",lg:"1.5vw"},fontWeight:"600",paddingBottom:"5vh"}} className="text-1">Other Services</Typography>
              <Typography sx={{fontSize:{xs:"3vw",md:"2vw",lg:"1.1vw"}}} className="text-3">
              Navigate Kashmir with our expert services, including Corporate Tours, School & College Tours, Filming & Media Support, Vehicle & Driver Hire, and Emergency Help.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{mt:{xs:30,sm:85,md:30,lg:0},backgroundImage:"url('/assets/travel-bg-2.jpg')",height:"100vh",backgroundSize:"cover",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <Paper variant="elevation" square={false} sx={{padding:"5vh",margin:{xs:"0 10vw 0 10vw",lg:"0 55vw 0 5vw"},borderRadius:"5%",width:{xs:"95vw"}}}>
            <Typography className="text-1" sx={{fontWeight:"700",fontSize:{xs:"6vw",md:"4vw",lg:"2vw",marginBottom:"3vh"}}}>
              Create Your Own Tour
            </Typography>
            <Typography className="text-3" sx={{fontSize:{xs:"3.5vw",sm:"3vw",md:"2vw",lg:"1.2vw"},marginBottom:"5vh"}}>
            Want to explore India independently without the hassle of booking transport, hotels, or excursions?<br/><br/>
            Let us handle the logistics while you enjoy the journey!
            </Typography>
            <Link to='/contact'><Button variant="contained" color="primary">Plan Your Trip</Button></Link>
          </Paper>
        </Box>
    </>
  );
}
