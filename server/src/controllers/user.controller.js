const User = require("../models/user.model");

// console.log("USER MODEL:", User);

// DELETE USER
   const deleteUser = async (req,res)=>{
      try {
        const user = await User.findById(req.params.id);
      
        if(!user){
         return res.status(404).json({
            message : "User not Found!"
          })
        }
        await user.deleteOne();
         
        res.status(200).json({
          message : "User was deleted Successfully!"
        })
      } catch (error) {
        
    res.status(500).json({
      message:"Server Error"
    });
    }
  }
//   const makeAdmin = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         role: "admin",
//       },
//       {
//         new: true,
//       }
//     );

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       message: "User is now Admin",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server Error",
//     });
//   }
// };

  module.exports = { deleteUser };