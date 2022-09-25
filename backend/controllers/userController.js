import User from "../model/User";
import bcrypt from "bcryptjs";

//GET ALL USER
export const getAllUser = async (req, res, nect) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
};

//SIGN UP METHOD
export const userSignUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "Existing User" });
  }
  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs:[],
  });

  try {
    user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ user });
};


// ------------------------------Login method
export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User not Found " });
  }

  const isPasswordMatching = bcrypt.compareSync(
    password,
    existingUser.password
  );
  if (!isPasswordMatching) {
    return res.status(400).json({ message: "Incorrect username or password" });
  }

  return res.status(200).json({ message: "Login successfull" , user:existingUser });
};
