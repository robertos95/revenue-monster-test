const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-foqcq.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;

// CONFIG
global.config = require("./config");

// SERVICES
const { tmdbAxiosInstance, getTMDBConfig } = require("./services/tmdb-axios.js");

app.set('view engine', 'ejs');
app.set('views', 'views');

// ROUTES
const adminRoutes = require("./routes/admin");
const apiRoutes = require("./routes/api");
const userRoutes = require("./routes/user");

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);
app.use(userRoutes);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true
  })
  .catch(err => {
    console.log(err);
  });

var server = app.listen(process.env.PORT || 8080, async () => {
  // Set TMDBAxiosConfiguration to config file
  await getTMDBConfig();
  console.log("Connected!");
});

module.exports = server;
