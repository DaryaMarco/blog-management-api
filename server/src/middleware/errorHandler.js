const logger = require("../config/logger");
const AppError = require("../utils/AppError")

const sendErrorDev = (err,req, res) =>{
    return res.status(err.statusCode || 500 ).json({
        status : err.status || "error",
        message : err.message,
        stack : err.stack
    });
}

const sendErrorProd = (err, req, res) =>{

    if(err.isOperational){  
    return res.status(err.statusCode).json({
        status : err.status,
        message : err.message
    })
     }
}

const handleCastErrorDB = (err) => {
    return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

const handleDuplicateFieldsDB = () => {
    return new AppError("Duplicate field value. Please use another value.", 400);
};

const handleJWTError = () => {
    return new AppError("Invalid token. Please log in again.", 401);
};

const handleJWTExpiredError = () => {
    return new AppError("Your token has expired. Please log in again.", 401);
};

const errorHandler = (err, req, res, next) => {

    logger.error({
        message: err.message,
        stack: err.stack,
        method: req.method,
        path: req.originalUrl
    });

    // Mongoose CastError
    if(err.name === "CastError"){
        err = handleCastErrorDB(err);
    }

    // Mongo duplicate key
    if(err.code === 11000){
        err = handleDuplicateFieldsDB(err);
    }

    // JWT errors
    if(err.name === "JsonWebTokenError"){
        err = handleJWTError();
    }

    if(err.name === "TokenExpiredError"){
        err = handleJWTExpiredError();
    }

    return res.status(err.statusCode || 500).json({
        status: err.status || "error",
        message: err.message
    });

};


module.exports = errorHandler;


// CastError تبدیل نمی‌شود و 500 می‌گیرم
    // if(process.env.NODE_ENV === "development" ||
    //      process.env.NODE_ENV === "test"
    // ){
    // return res.status(err.statusCode || 500).json({
    //         status : err.status || "error",
    //         message : err.message,
    //         stack : err.stack
    //     });
    // }

    // return res.status(err.statusCode || 500).json({
    //     status: "error",
    //     message: "Something went wrong"
    // });

    