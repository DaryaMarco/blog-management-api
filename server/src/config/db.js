const mongoose = require("mongoose");
const config = require("./config");


const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI);

        console.log("MongoDB Connected 🚀");

    } catch(error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;