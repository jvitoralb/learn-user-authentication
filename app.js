require('dotenv').config();

const cors = require('cors');
const express = require('express');
const routes = require('./routes/apis.js');
const dbConnection = require('./config/database/connect.js');


const app = express();

dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(routes);

module.exports = app;