import { Splide, SplideSlide } from "@splidejs/react-splide";
import {Box} from '@mui/material';
import "@splidejs/react-splide/css";

//import '@splidejs/react-splide/css/skyblue';
//import '@splidejs/react-splide/css/sea-green';

//import '@splidejs/react-splide/css/core';

import React from "react";
import './css/carousel.css'

export default function Carousel() {
  return (
    <Box sx={{width:{xs:"100vw",md:"90vw",lg:"90vw"},display:"flex",justifyContent:"center",marginTop:"12vh"}}>
    <Splide
      options={{
        rewind: true,
        width: "100vw",
        gap: "1rem",
        
      }}
      aria-label="My Favorite Images"
    >
      <SplideSlide>
        <img className='slide-images' src="/assets/caro-1.svg" alt="Image 1" />
      </SplideSlide>
      <SplideSlide>
        <img className='slide-images' src="/assets/carousel-2.jpg" alt="Image 2" />
      </SplideSlide>
      <SplideSlide>
        <img className='slide-images' src="/assets/carousel-3.jpg" alt="Image 3" />
      </SplideSlide>
    </Splide>
    </Box>
  );
}
