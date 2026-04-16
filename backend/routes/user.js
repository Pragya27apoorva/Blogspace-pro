const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

router.post("/follow/:id", auth, async (req,res)=>{
  const me = await User.findById(req.user.id);
  const target = await User.findById(req.params.id);

  if(!me.following.includes(target._id)){
    me.following.push(target._id);
    target.followers.push(me._id);
  }

  await me.save();
  await target.save();

  res.json("Followed");
});

router.post("/unfollow/:id", auth, async (req,res)=>{
  const me = await User.findById(req.user.id);
  const target = await User.findById(req.params.id);

  me.following = me.following.filter(id=>id.toString()!=target._id);
  target.followers = target.followers.filter(id=>id.toString()!=me._id);

  await me.save();
  await target.save();

  res.json("Unfollowed");
});

router.get("/:id", async (req,res)=>{
  const user = await User.findById(req.params.id).select("-password");
  res.json(user);
});

module.exports = router;