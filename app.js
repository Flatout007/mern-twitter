const mongoose = require('mongoose');
const express = require('express')
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const bodyParser = require('body-parser');
const db = require('./config/keys').mongoURI;
const passport = require('passport');
const path = require('path');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

const app = express();

mongoose
    .connect(db, { useNewUrlParser: true }) 
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;


// app.get("/", (req, res) => {
  
//     console.log(res)
    
//     res.send("wassup")


// });

app.use("/api/users", users);
app.use("/api/tweets", tweets);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
require('./config/passport')(passport);


app.listen(port, () => console.log(`Server is running on port ${port}`));

