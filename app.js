const mongoose = require('mongoose');
const express = require('express')
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const bodyParser = require('body-parser');
const db = require('./config/keys').mongoURI;

const app = express();

mongoose
    .connect(db, { useNewUrlParser: true }) 
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  
    console.log(res)
    
    res.send("wassup")


});
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use("/api/users", users);
app.use("/api/tweets", tweets);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());