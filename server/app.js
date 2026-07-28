require("./src/config/env");                                            
const express = require("express");

const mongoSanitize = require("express-mongo-sanitize");
const errorHandler = require("./src/middleware/errorHandler");    
const cors = require("cors");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");


const corsOption = {
  origin : "http://localhost:3000"
}
  const limiter = rateLimit({
    windowMs: 15*60*1000, // 15 دقیقه
    max : 100, // حداکثر 100 درخواست
    message: "Too menay request, Try again later!"
  })
app.use(express.json());
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
app.use(morgan("dev"))
app.use((req, res, next) => {

    if(req.body){
        req.body = mongoSanitize.sanitize(req.body);
    }

    if(req.params){
        req.params = mongoSanitize.sanitize(req.params);
    }

    next();

});
app.use(helmet());
app.use(limiter);
const authRoutes = require("./src/routes/auth.route");
const postRoutes = require("./src/routes/post.route");
const userRoutes = require("./src/routes/user.route");


app.use(cors(corsOption));
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
// این مشخصات (specs) را به Swagger UI بده تا صفحه مستندات را بسازد
app.use("/api/posts", require("./src/routes/comment.route"));

app.get("/test-error", (req,res,next)=>{

    const error = new Error("Test Error");

    error.status = 400;

    next(error);

});
app.use(errorHandler);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API is running",
    timestamp: new Date()
  });
});

app.get("/", (req, res) => {
  res.send("Blog API is running...");
});

module.exports = app;


// Request
//    ↓
// Helmet
//    ↓
// Express
//    ↓
// Route
//    ↓
// Controller

// ..........

// Request
//    ↓
// Helmet
//    ↓
// Express
//    ↓
// Rate Limit
//    ↓
// Routes
//    ↓
// Controller