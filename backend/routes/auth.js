const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req,res)=>{
  const {username,email,password} = req.body;
  const hash = await bcrypt.hash(password,10);

  const user = new User({username,email,password:hash});
  await user.save();

  res.json("Registered");
});

router.post("/login", async (req,res)=>{
  const {email,password} = req.body;

  const user = await User.findOne({email});
  if(!user) return res.status(400).json("User not found");

  const match = await bcrypt.compare(password,user.password);
  if(!match) return res.status(400).json("Wrong password");

  const token = jwt.sign({id:user._id},"secret123");

  res.json({token,user});
});

module.exports = router;