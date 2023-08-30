import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import "./allblog.css"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function AllBlog({title,description,image,userName,time,id,isUser}) {
  const navigate = useNavigate();
  const Base_URL= "http://localhost:9000"
  const handleEdit = () => {
    navigate(`/edit-blog/${id}`)
  }
  const handleDelete = async() => {
   try {
     const response = await axios.delete(`${Base_URL}/delete/${id}`)
     if (response) {
       alert("blog deleted")
       navigate("/all-blogs")
     }
   } catch (error) {
    
   }
  }
  return (
    <Card className='individual-blog' sx={{ maxWidth: 345}}>
      
      {isUser && (
        <Box display={'flex'}>
          <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteOutlineIcon/>
          </IconButton>

        </Box>
      )}
      
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {userName}
          </Avatar>
        }
        
        title={title}
        subheader={time}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
           <Typography variant="body2" color="text.secondary">
           Title : {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description :{description}
        </Typography>
      </CardContent>
     
      
    </Card>
  );
}
