import Header from "./Components/Header";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./Components/Auth";
import Blogs from "./Components/Blogs";
import UserBlogs from "./Components/UserBlogs";
import BlogDetail from "./Components/BlogDetail";
import AddBlogs from "./Components/AddBlogs";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
// import {store} from './store/index'

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  });
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlogs />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlog/:id" element={<BlogDetail />} />
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
