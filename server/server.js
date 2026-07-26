
// Fix Node.js DNS SRV resolution issue for MongoDB Atlas


const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);


require("dotenv").config({
  path : process.env.NODE_ENV=== "test"
  ? ".env.test"
  :".env"
});

const app = require("./app");
const config = require("./src/config/config");
const connectDB = require("./src/config/db");

async function startServer() {
  try {
    await connectDB();

    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();