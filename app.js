require('dotenv').config();

const cors = require('cors');
const express = require('express');
const passport = require('passport');
const routes = require('./routes/apis.js');
const configPassport = require('./config/passport/passport.js');
const dbConnection = require('./config/database/connect.js');


const app = express();

dbConnection();
configPassport(passport);


app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(routes);

module.exports = app;