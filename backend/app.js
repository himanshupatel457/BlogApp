import express from "express";
// const mongoose =require("mongoose");
import cors from "cors";
import mongoose from "mongoose";
import blogRouter from "./routes/blogRoutes";
import router from "./routes/userRoutes";

const app = express();;

app.use(cors());
app.use(express.json());

app.use("/api/user",router);
app.use("/api/blog",blogRouter)

mongoose
  .connect(
    "mongodb+srv://{link to connect to database}"
  )
  .then(() => app.listen(4000, () => console.log("server is running")))
  .then(() => console.log("Mongo Online"))
  .catch((err) => console.log("this is error", err));
// app.listen(5000);

//yTdkkTMNMv1E6T5J
