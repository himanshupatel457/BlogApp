import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:4000/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  // console.log("this is user blogs",blogs);

  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((item, index) => (
          <Blog
            key={index}
            id={item._id}
            isUser={true}
            title={item.title}
            description={item.description}
            imageURL={item.image}
            userName={user.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
