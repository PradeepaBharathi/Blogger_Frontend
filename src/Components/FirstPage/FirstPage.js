import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Box } from '@mui/material'
import { Button } from "@mui/material"
import "./first.css"
function FirstPage() {
    const navigate = useNavigate()

    const redirect = () => {
        navigate('/')
    }
   
  return (
      <Box className="first-page">
          <Typography variant="h1" className="heading">Welcome to our Blog</Typography>
          <Typography className="about-blogapp">Welcome to our Blog App, your go-to destination for insightful and engaging content!
              Whether you're a passionate writer, an avid reader, or simply curious about various topics,
              our platform is designed to cater to all your interests.</Typography>
          {/* <Button variant="contained" color="primary" onClick={redirect}>
        Go to Home
      </Button> */}
    </Box>
  )
}

export default FirstPage