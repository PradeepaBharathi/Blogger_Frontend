import React, { useState,useEffect } from 'react'
import "./userblog.css"
import Header from '../header/Header'
import { useGlobalContext } from '../../context'
import AllBlogs from '../BlogCard/Allblog'
function UserBlog() {
const{getUserblogs,Userblogs,setUserBlogs,blogs} =useGlobalContext()
  useEffect(() => {
   getUserblogs()
 },[])
    return (
    <div className='user-blogcontainer'>
      {Userblogs && Userblogs.length > 0 ? (
        Userblogs.map((Userblogs) => (
          <AllBlogs
            id={Userblogs._id}
            isUser={true}
            title={Userblogs.title}
            description={Userblogs.description}
            image={Userblogs.image}
            username={Userblogs.userName}
            time={Userblogs.createdAt}
            
          />
        ))
      ) : (
        <h1>You Havent Created a blog</h1>
      )}
    </div>
  );
};

export default UserBlog