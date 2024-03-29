require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');

// const fs = require("fs");
// const https = require("https");


const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");



const db = require("./config/key").mongoURI;

const mongoose = require("mongoose");
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/photo', require('./routes/photo'));


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));


  // index.html for all page routes
  app.get("*", (req, res) => {

    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000


app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});