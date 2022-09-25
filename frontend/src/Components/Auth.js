import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:4000/api/user/${type}`, {
        name: inputs.name.toString(),
        email: inputs.email.toString(),
        password: inputs.password.toString(),
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignUp) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #3a4b8a"
          padding={3}
          margin="auto"
          marginTop={15}
          borderRadius={5}
          maxWidth={500}
          // boxSizing={1}
        >
          <Typography variant="h3" padding={2} textAlign="center">
            {isSignUp ? "Signup" : "Login"}
          </Typography>
          {isSignUp && (
            <TextField
              onChange={handleChange}
              name="name"
              value={inputs.name}
              placeholder="Name"
              margin="normal"
            />
          )}
          {""}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ marginTop: 1 }}
          >
            Submit
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => setIsSignUp(!isSignUp)}
            sx={{ marginTop: 2 }}
          >
            Want to {isSignUp ? "LOGIN" : "SIGNUP"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
