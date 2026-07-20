const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const config = require("../config/config");

   //UserRegister
const register = async (req, res) => {
  
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

   if(existingUser){

    throw new AppError(
        "User already exists😒",
          400
      );

}

  const hashedPassword = await bcrypt.hash(password, 10);
 
  const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
};


//User Login
const login = async(req, res)=>{
  
  const { email, password } = req.body;

  const user = await User.findOne({email});

  if(!user){
    throw new AppError(
      "Invalid Email or Password... 😂",
       400
    )
  }

  const isMatch = await bcrypt.compare(password, user.password);

   if (!isMatch) {
       throw new AppError(
      "Invalid Email or Password... 😂",
       400
    )};
    
// TOKEN
  const token = jwt.sign(
      {
      id : user._id,
      email :user.email,
      role : user.role
      },
      config.jwtSecret,
      {
      expiresIn : config.jwtExpiresIn
      }
    )
      res.status(200).json({
        message : "Login was Successful",
        token,
        user :{
          id: user._id,
          name : user.name,
          email : user.email,
        },
    });
      
    };



module.exports = { register,login };