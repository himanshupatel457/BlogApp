import React, { useEffect, useState } from "react";

import axios from "axios";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:4000/api/blog")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log("this is blogs", blogs);
  return (
    <div>
      {blogs &&
        blogs.map((item) => (
          <Blog
            id={item._id}
            isUser={localStorage.getItem("userId") === item.user._id}
            title={item.title}
            description={item.description}
            imageURL={item.image}
            userName={item.user.name}
          />
        ))}
    </div>
  );
};
export default Blogs;
