import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  CardMedia,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useNavigate } from "react-router-dom";
import axios from "axios";

let Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  // let Id = id.toString();
  // // Id;
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myblog/${id}`);
  };
  console.log(title, isUser);

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:4000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest().then(()=>navigate("/myblogs")).then(()=>navigate("/blogs"));
  };
  return (
    <div>
      <Card
        sx={{
          width: "50%",
          margin: "auto",
          mt: 2,
          paddiig: 2,
          boxShadow: "4px 6px 10px #cccc",
          ":hover": {
            boxShadow: "10px 15px 15px #fd7707",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteSweepIcon />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName[0]}
            </Avatar>
          }
          title={title}
          subheader={Date.now()}
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="imageURL"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <b>{userName} : </b>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
