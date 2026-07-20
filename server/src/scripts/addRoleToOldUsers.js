const mongoose = require("mongoose");
const User = require("../models/user.model");

mongoose.connect("mongodb://localhost:27017/gym-management")
.then(async () => {

  await User.updateMany(
    { role: { $exists: false } },
    { $set: { role: "user" } }
  );

  console.log("Users updated");

  mongoose.disconnect();

})
.catch(err => {
  console.log(err);
});