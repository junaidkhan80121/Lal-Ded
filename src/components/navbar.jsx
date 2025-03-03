import { AppBar, Toolbar, Typography, Box, Menu, MenuItem, IconButton, Button } from '@mui/material';
import { React, useState } from 'react';
import "./css/navbar.css";
import "../text.css";
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <AppBar elevation={0} position="fixed" sx={{ backgroundColor: "#e7f0ff" }}>
      <Toolbar>
        <Box sx={{display:"flex",alignItems:"center"}}>
          <Link to='/'><img className="logo-img" src="/logo.png" alt="logo" /></Link>
          <Link to='/'><Typography className='logo'><b>Lal Ded</b></Typography></Link>
        </Box>
        <Box sx={{ marginLeft: "auto", display: { xs: "none", sm:"none", md:"flex",lg: "flex" } }}>
          <ul>
          <Link className="nav-links text-1" style={{ fontWeight: "700", fontSize:"1.1vw" }} to="/">Home</Link>
          <Link className="nav-links text-1" style={{ fontWeight: "700", fontSize:"1.1vw" }} to="/contact">Contact Us</Link>
          <Link className="nav-links text-1" style={{ fontWeight: "700", fontSize:"1.1vw" }} to="/about">About Us</Link>

          </ul>
        </Box>
        <Box sx={{ display: { md:"none", lg: "none", marginLeft: "auto" } }}>
          <IconButton onClick={handleClick} edge="end" color="inherit" aria-label="menu">
            <MoreVertIcon sx={{color:"black"}}/>
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={()=>handleClose()}><Link style={{display:"flex",alignItems:"center"}} className="nav-links text-1" to='/'><HomeIcon/>&ensp;Home</Link></MenuItem>
            <MenuItem onClick={()=>handleClose()}><Link style={{display:"flex",alignItems:"center"}} className="nav-links text-1" to='/contact'><CallIcon/>&ensp;Contact Us</Link></MenuItem>
            <MenuItem onClick={()=>handleClose()}><Link style={{display:"flex",alignItems:"center"}} className="nav-links text-1" to='/about'><InfoIcon/>&ensp;About Us</Link></MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}