import './App.css'
import Navbar from './components/navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Contact from './Contact'
import About from './About'
import { createTheme, ThemeProvider } from '@mui/material'
import Footer from './components/Footer'
const theme = createTheme({
  palette:{
    primary:{
      main:"#6d62ff"
    },
  }
})

function App() {
 

  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
        <Footer/>
        </ThemeProvider>
      </Router>
      
    </>
  )
}

export default App
