const User = require("../models/user.models.js");

module.exports.getUser = async function getUser(req, res) {
  let id = req.id;//this id will be taken agter succesfull login from protectroute
  console.log(id);

  let user = await User.findById(id);

  if (user) {
    return res.json(user);
  } else {
    return res.json({
      message: "User not found...",
    });
  }
};

module.exports.updateUser = async function updateUser(req, res) {

  /*
  let id = req.params.id;
  let user = await User.findById(id);
  let dataToBeUpdated = req.body;
  
  try {
    if (user) {
      const keys = [];
      for (let key in dataToBeUpdated) {
        keys.push(key);
      }

      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }
      await user.save();//this will save the updated data
      res.send("data has been updated successfully");
    } else {
      res.json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.json({
      Message: error.message,
    });
  }
  */
   
  try {
    let id = req.params.id;
    console.log(id);
    let dataToBeUpdated = req.body;
    let  user = await User.findOneAndUpdate({ _id: id }, dataToBeUpdated, { new: true });//this new :true means that user will now store updated data 

    if (user) {
         res.json({
           message:"data updated sucesfully",
           USERDATA:user
         })
    } else {
        res.status(404).send("User not found.");
    }
   } catch (error) {
    res.status(500).send("An error occurred while updating the user.");
   }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  try {
    let id = req.params.id; // from postman we have send the data that we want to delete
    console.log('Deleted id is ',id);
    let user = await User.findByIdAndDelete(id)
    
    if(user){
    res.status(200).json({
      //this is called chaining
      message: "user data is deleted successfully",
      data:user
    });
    }
    else{
     res.json({
        Message:"User not found"
     })
    }

  } catch (error) {
     res.status(500).json({
        Message:"Internal server error"
     })
  }
};

module.exports.getAllUser = async function getAllUser(req, res) {
   try {
    let users= await User.find()
    if(users){
     res.json({
        Message:"users data is retreived",
        data:users
     })
    }
    else{
     res.json({
         Message:"Not accessiabl"
     })
    }
   } catch (error) {
     res.status(500).json({
        Message:"Internal server error"
     })
   }
};

 
module.exports.updateProfileImage=function(req,res){
  res.json({
    message:"file updated succesfully"
  })
}
