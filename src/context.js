import React from "react";
import axios from "axios";
import { useContext, useState } from "react";

const Base_URL = "https://blogger-ayru.onrender.com"

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [signupUser, setSignupUser] = useState(null);
  const [details, setDetails] = useState({ Email: "", Name: "" })
  const id = localStorage.getItem("userId");
  const [posts, setPosts] = useState([]);
  const [blogs, setBlogs] = useState([])
  const [Userblogs, setUserBlogs] = useState([])
  const [inputs, setInputs] = useState({});
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  
  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };
  const addUser = async (Name, Email, Password) => {
    try {
      const response = await axios.post(
        `${Base_URL}/add-user`,
        {
          Name,
          Email,
          Password
        }
      )
      console.log(response.data);
    }
    catch (err) {
      console.log(err);
    }
  };
  const loginUserid = async (id, Email, Password) => {
       
    try {
      
      const response = await axios.post(
        `${Base_URL}/add-login-user`,
        {
         
          Email,
          Password
        },
       
      )
      if (response.status === 200) {
        return response;
      } else {
        throw new Error('An error occurred while logging in.');
      }
     
    }
    catch (err) {
      if (err.response && err.response.status === 401) {
        throw new Error('Incorrect email or password.');
      } else {
        throw new Error('An error occurred while logging in.');
      }
    }
  };
  
  const uploadFile = async (data) => {

    try {
      const response = await axios.post(`${Base_URL}/upload`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const createPost = async (title, Description, Email, categories, createdDate) => {
       
    try {
      
      const response = await axios.post(
        `${Base_URL}/create`,
        {
          title,
          Description, Email, categories, createdDate
        }
      )
       
      return response;
     
    }
    catch (err) {
      console.log(err);
    }
  };

  const getAllBlogs = async () => {
    try {
      const response = await axios.get(`${Base_URL}/all-blog`)
      
      if (response && response.data) {
        setBlogs(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getUserblogs = async () => {
    try {
      const id = localStorage.getItem("userId")
      console.log(id)
      const response = await axios.get(`${Base_URL}/user-blogs/${id}`)
           
      if (response) {
        setUserBlogs(response.data.userBlogs);
        console.log(response.data.userBlogs)
      }
        
    } catch (error) {
      console.log(error)
    }
  }
  const getBlogDetails = async (blogid) => {
    try {
      
      const response = await axios.get(`${Base_URL}/blog/${blogid}`)
     console.log(response)
      if (response) {
        console.log(response.data.data)
        setTitle(response.data.title)
        setDescription(response.data.description)
        setImage(response.data.image)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
 
  
  const createBlogs = async (req, res) => {
  try {
    const response = await axios.get(`${Base_URL}/add-blog`, {
      title: inputs.title,
      description: inputs.description,
      image: inputs.image,
      user: id,
    })
   
      if(response && response.data) {
        console.log("blog created")
      }
    } catch (error) {
      console.log(error)
    }
  }


  const contextValue = {
    signupUser,
    setSignupUser,
    addUser,
    loginUserid,
    details,
    setDetails,
    posts,
    setPosts,
    addPost,
    uploadFile,
    createPost,
    blogs,
    getAllBlogs,
    createBlogs,
    getUserblogs,
    Userblogs,
    setUserBlogs,
    getBlogDetails,
    inputs,setInputs
  }
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};