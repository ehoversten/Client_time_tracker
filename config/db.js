const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI_test, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log(`Mongo Atlas DB Connected: ${conn.connection.host}`);
}

module.exports = connectDB;