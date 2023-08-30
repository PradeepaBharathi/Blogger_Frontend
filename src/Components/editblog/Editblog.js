import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const EditBlog = () => {
  const Base_URL = "http://localhost:9000";
  const { id } = useParams();
  const navigate = useNavigate();
  const [message,setMessage]=("")
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  const fetchBlogDetails = async () => {
    try {
      const response = await axios.get(`${Base_URL}/blog/${id}`);
      const { title, description, image } = response.data.data;
      setBlogData({ title, description, image });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(`${Base_URL}/edit-blog/${id}`, {
        title: blogData.title,
        description: blogData.description,
        image: blogData.image
      });
      if (result.status === 200) {
         alert("blog updated")
        navigate("/all-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
     <>
      <form onSubmit={handleSubmit}>
        <Box
                  width={"45%"}
                  height={"30%"}
          border={2}
          borderRadius={10}
          padding={1.5}
                  margin="auto"

          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="70px"
        >
          <Typography
            variant="h6"
            textAlign={"center"}
            fontWeight="bold"
            padding={2}
            color="gray"
          >
            Edit Blog
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 1, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={blogData.title}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 1, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={blogData.description}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 1, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={blogData.image}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" color="warning" variant="contained" id="submit">
            Update
          </Button>
               {message && <p id="message">{message}</p>}
        </Box>
      </form>
    </>
  );
};

export default EditBlog;