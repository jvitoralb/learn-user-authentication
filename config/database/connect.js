require('dotenv').config();

const mongoose = require('mongoose');


module.exports = dbConnection = () => {
    return mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
};