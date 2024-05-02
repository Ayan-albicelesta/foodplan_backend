const express = require("express");
const app = express();

const cookieParser=require('cookie-parser')

const User=require('../models/user.models.js')

const userRouter = express.Router();

const protectRouter=require('./authHelper.router.js')

const{getUser,getAllUser,updateUser,deleteUser,updateProfileImage} =require('../controller/userController.js')
const{signup,login,isAuthorised,protectRoute,forgetPassword,resetPassword,logout}=require('../controller/authController.js')
 
const multer=require('multer')
const path = require('path');

//user's options
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login)

userRouter
.route('/forgetpassword')
.post(forgetPassword)

userRouter
.route('/resetpassword/:token')//this token is temporary restToken in db that will be used for generating link to reset password, after resetting we will delete resetToken from db'8
.post(resetPassword)

 

//profile page
userRouter
.route('/userProfile')
.get(protectRoute,getUser)


//multer for filupload

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Construct an absolute path to the 'Public/images' directory
    const destPath = path.join(__dirname, '..', 'Public', 'images');
    cb(null, destPath);
  },
  filename:function(req,file,cb){
    cb(null,`User-${file.originalname}-${Math.round(Math.random()*Math.random())}.jpeg`)
  }
});

const filter=function(req,file,cb){
  if(file.mimetype.startsWith("image")){
    cb(null,true)
  }
  else{
    cb(new Error("Not an image. please upload an image",false))
  }
}

const upload=multer({
  storage:multerStorage,
  fileFilter:filter
})

userRouter.post('/ProfileImage',upload.single("photo"),updateProfileImage)
//get request
 
userRouter.get('/ProfileImage',(req,res)=>{
  res.sendFile("E:/Backend_pepcoding/multer.html")
})

userRouter
.route('/logout')
.get(logout)

//admin based work
userRouter.use(protectRoute);//any data modification with req,res in protectroute middleware can be accessiable by the next route, thet is '/' here. here req.role is passed from protectroute to isAuthorised
userRouter.route('/')
.get(isAuthorised(['admin']),getAllUser)



  module.exports=userRouter