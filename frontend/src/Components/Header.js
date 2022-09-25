import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { authActions } from "../store";
const Header = () => {

  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(107deg, rgba(74,74,136,1) 0%, rgba(23,46,112,1) 28%, rgba(23,82,112,1) 56%)",
      }}
    >
      <Toolbar>
        <Typography variant="h3">BLOGIFY</Typography>
        {isLoggedIn && <Box display="flex" marginLeft={"auto"}>
          <Tabs
            textColor="inherit"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to="/blogs" label="LATEST BLOGS" />
            <Tab LinkComponent={Link} to="/myBlogs" label="MY BLOGS" />
            <Tab LinkComponent={Link} to="/blogs/add" label="WRITE BLOG" />
          </Tabs>
        </Box>}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && <><Button
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            color="secondary"
            sx={{ margin: 1.5, borderRadius: 2 }}
          >
            Login
          </Button>

         <Button
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            color="error"
            sx={{ margin: 1.5, borderRadius: 2 }}
          >
            Signup
          </Button></>}
          {isLoggedIn && <Button
            onClick={()=>dispatch(authActions.logout())}
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            color="warning"
            sx={{ margin: 1.5, borderRadius: 2 }}
          >
            LogOut
          </Button>}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
