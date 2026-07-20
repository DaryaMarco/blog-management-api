const mongoose = require("mongoose");
const config = require("./config");

console.log("config =", config);
console.log("mongoURI =", config.mongoURI);

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