import React from 'react'
import './myblog.css'
import Header from '../header/Header'
import { useState,useEffect } from 'react'
import { useGlobalContext } from '../../context'
import AllBlogs from '../BlogCard/Allblog'
function Myblog() {
  const { getAllBlogs, blogs } = useGlobalContext()
  
  useEffect(()=> {
   getAllBlogs()
  }, [])
 
  return (
      <div className="my-blog-container">
      <Header />
      {blogs && blogs.map((blog) =>
        <AllBlogs 
          key={blog._id}
          id={blog._id}
          isUser={localStorage.getItem("userId") === blog.user}
          title={blog.title}
          description={blog.description}
          image={blog.image}
          userName={blog.userName}
          time={blog.createdAt}
        />)}
      
      </div>
  )
}

export default Myblog