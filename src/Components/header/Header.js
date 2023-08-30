import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import{AppBar,Toolbar,Typography} from '@mui/material'
function Header() {
  return (
      <AppBar id='app-bar'>
          <Toolbar id="tool-bar">
              <Link to='/'>Home</Link>
              <Link to='/create-blog'>Create-Blog</Link>
               <Link to='/all-blogs'>All-Blog</Link>
              <Link to ='/My-Blogs'>My-Blogs</Link>
              <Link to ='/login'>Logout</Link>
              
          </Toolbar>
        </AppBar>
  )
}

export default Header