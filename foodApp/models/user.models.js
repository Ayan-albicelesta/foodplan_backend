const express = require("express");
const app = express();

const mongoose = require("mongoose");
const emailValidator=require("email-validator")
const bcrypt=require('bcrypt')

const cryptojs=require('crypto')//this is inbuilt in nodejs



//database connect
const db_link ="mongodb+srv://ayankhanracoder:ayan1234@cluster0.u2vpa6e.mongodb.net/";

mongoose
  .connect(db_link)
  .then(function (db) {
    // console.log(db);
    console.log("database connected");
  })
  .catch(function (err) {
    console.log(err);
  });

//data modelling using mongoose
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
    validate:function(){
      return emailValidator.validate(this.email)//returns true or false
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    validate:function(){
      return this.confirmPassword==this.password
    }
  },
  confirmPassword:{
    type: String,
    required: true,
    minlength: 5,
  },
  role:{
    type:String,
    enum:['admin','user','restaurantowner','deliveryboy'],
    default:'user'
  },
  profileImage:{
    type:String,
    default:'img/user/default/jpeg'
  },
  resetToken:String
});

/////////////////////////VVI/////////////////////////
//always use hooks before creating  model(here all hooks are used befor the creation of 'User' model)

// hooks
/*
// Define pre-save hook
userSchema.pre('save', function(next) {
  console.log('before saving to db', this);
  next(); // Don't forget to call next() to move to the next middleware
});

// Define post-save hook
userSchema.post('save', function(doc, next) {//'save': Runs after a document is saved.It's great for post-processing or logging operations.
  console.log('after saving in db', doc);
  next(); // Ensure to call next() here as well if you're using this form of the hook
});


//remove: Executes after a document is removed from the database. It's helpful for cleaning up related data or logging
// that a deletion has occurred.
userSchema.pre('findOneAndDelete', function(next) {
  console.log('before deleting to db', this);
  next(); // Don't forget to call next() to move to the next middleware
});
userSchema.post('findOneAndDelete', function(doc, next) {
  console.log('after deleting in db', doc);
  next(); // Ensure to call next() here as well if you're using this form of the hook
});
*/


userSchema.pre('save',function(next){
  if (this.isModified('password')) {
    this.confirmPassword = undefined;
}
  next();  
})


 

// userSchema.pre('save',async function(){
//     let saltRound=10
//     let hasedPassword=await bcrypt.hash(this.password,saltRound)
//     console.log(hasedPassword);
// })

//here we have explicitly generated salt , that gieves slight flexibility, but both are quite same
// userSchema.pre('save',async function(){
//     try {
//      let salt=await bcrypt.genSalt(5)//if any parameter is not given by default it takes 10 round here saltround is=5,
//      // if we give large number like 20 ,it will not respond due to high computational 
//     let hashedPassword= await bcrypt.hash(this.password,salt)
//     console.log(hashedPassword);
//     this.password=hashedPassword
    
//     } catch (error) {
//         console.log("ERR",error);
//     }
     
// })

userSchema.methods.createResetToken=function(){
  //creating unique tooken using crypto module that is inbuildt in nodejs
   const token=cryptojs.randomBytes(32).toString("hex")
   this.resetToken=token;
   return token
}

//this method will only execute after authentication 
userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
  this.password=password
  this.confirmPassword=confirmPassword
  this.resetToken=undefined

}
  


const User = mongoose.model("User", userSchema);
 


module.exports=User