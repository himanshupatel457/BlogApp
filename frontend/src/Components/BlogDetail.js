import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetail = () => {

  const navigate = useNavigate();
  const Styles = {
    mt: 2,
    mb: 1.5,
    fontSize: "20px",
    fontWeight: "bold",
    color: "##808080",
  };

  const [inputs, setInputs] = useState({});
  // ----------------------------
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
  };

  const [blog, setBlog] = useState();
  const id = useParams().id.toString();
  console.log(typeof id);
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:4000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        imageURL: data.blog.image,
      });
    });
  }, [id]);
  console.log(blog);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(()=>navigate("/myblogs/"));
  };

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:4000/api/blog/update/${id}`, {
        title: inputs.title.toString(),
        description: inputs.description.toString(),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={8}
            // borderRadius={5}
            borderColor="#fd7707"
            padding={5}
            margin={"auto"}
            display="flex"
            flexDirection={"column"}
            width={"50%"}
            marginTop={5}
            // alignItems="center"
            // alignContent={"center"}
            // alignSelf={"center"}
            boxShadow="8px 8px 16px #efaa08"
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              variant="h3"
              textAlign={"center"}
              color="#4d4d4e"
            >
              ADD A BLOG
            </Typography>
            <InputLabel sx={Styles}>Blog Title</InputLabel>
            <TextField
              value={inputs.title}
              onChange={handleChange}
              name="title"
              margin="normal"
              variant="outlined"
            />
            <InputLabel sx={Styles}>Blog Description</InputLabel>
            <TextField
              value={inputs.description}
              onChange={handleChange}
              name="description"
              margin="normal"
              variant="outlined"
            />
            {/* <InputLabel sx={Styles}>Memories</InputLabel>
          <TextField
            value={inputs.imageURL}
            onChange={handleChange}
            name="imageURL"
            margin="normal"
            variant="outlined"
          /> */}
            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={{ marginTop: 1 }}
              size="medium"
            >
              ADD
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
