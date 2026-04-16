const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("DB Connected"))
  .catch(err=>console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/blog", require("./routes/blog"));
app.use("/api/user", require("./routes/user"));
app.use("/api/ai", require("./routes/ai"));

app.listen(5000, ()=>console.log("Server running"));