import express, { Router } from "express";
import { getAllUser, userSignUp,userLogin } from "../controllers/userController";

const router = express.Router();

router.get("/",getAllUser);
router.post("/signup",userSignUp);
router.post("/login",userLogin);

export default router;