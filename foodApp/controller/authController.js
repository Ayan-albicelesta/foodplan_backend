const express = require("express");

const User = require("../models/user.models.js");
const planModel=require('../models/plan.models.js')

const jwt = require("jsonwebtoken");
const JWT_KEY = require("../../secrets.js"); //this is secret key

const {sendMail} =require('../utility/nodemailer.js')

//sign up user
module.exports.signup = async function signup(req, res) {
  try {
    let obj = req.body;
    let user = await User.create(obj);
    //if user is signed up send conformation mail by nodemailer
    sendMail("signup",user);
    if (user) {
      res.json({
        message: "user signedup",
        data: user,
      });
    } else {
      res.json({
        message: "error while siging up",
      });
    }
  } catch (error) {
    res.status(500).json({
      Message: error.message,
    });
  }
};

//login user
module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    console.log(data.email);
    if (data.email) {
      //if email is present

      let user = await User.findOne({ email: data.email });
      if (user) {
        //if user is found in database
        if (user.password == data.password) {
          //if password given by user matches with database password
          console.log("logged in succesfully");

          let uid = user["_id"]; //unique id in db, will use is as payload

          //jwt.sign() will generate JWT, so token will consist the JWT
          let token = jwt.sign({ payload: uid }, JWT_KEY); //first argument is payload,second is secret key, here by default header/algo is 'sha256'
          //const token=jwt.sign({payload:uid},JWT_KEY,{algorithm:'RS256})//here header/algo is explicitly mentionde as {algorithm:'RS256}

          res.cookie("login", token, { httpOnly: true });//sending jwt cookie to browser
          console.log('jeson web token is ',token);
          return res.json({
            message: "User has logged in",
            userDetails: data,
          });
        } else {
          return res.json({
            message: "Wrong credentials",
          });
        }
      } else {
        return res.json({
          message: "User not found",
        });
      }
    } else {
      //password not there
      res.json({
        message: "Data not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

//isAuthorised

module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
     
    // console.log('role is ',req.cookies.ROLE);//this is when we want to send role via cookies
    if (roles.includes(req.role)==true) {//req.role is set in protecroutr
      next();
    } else {
      res.status(401).json({
        Message: "operation not allowed",
      });
    }
  };
};

//protectRoute
module.exports.protectRoute=async function protectRoute(req, res, next) {

  try {
    let token;
    if (req.cookies.login) {
      
      console.log(req.cookies.login);
      token = req.cookies.login;//token is JWT cookie

      //get payload(user detail from jwt cookies)
      let payload = jwt.verify(token, JWT_KEY); //if jwt vrifies then it return payload
      console.log('payload from jwt cookies',payload);

      if (payload) {
        const user = await User.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        console.log(`role is ${req.role} and user id is${req.id}`);
        // res.cookie("ROLE",req.role,{httpOnly:true})
        next()
         
      } else {
        res.json({
          message: "user not verified",
        });
      }
    } else {
      const client=req.get('User-Agent')
      
      //for browser
      if(client.includes("Mozilla")){
        return res.redirect('/login')
      }
      //for postman
      else{
      res.json({
        message: "pls login again cookies not found",
      });
      }
      
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
}


//forgetpassword
module.exports.forgetPassword=async function forgetPassword(req,res){
   let {email}=req.body//this line means we are destructing the email part from object

   try {
     const user=await User.findOne({email:email})//if we have not destructured we have to write ({email:req.body.email})

     if(user){
     //generating resetToken in db for creating unique link and find user in  with this 
     const resetToken=user.createResetToken()//we can use custom methods with model schema,

     //generating unique link for reseting password
     let  resetPasswordLink=`${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`

     //now send this link via nodemailer to user to update password
     let obj={//we are passing email also, with the link, to send mail to this email id
      resetPasswordLink:resetPasswordLink,
      email:email
     }
     sendMail("resetpassword",obj)//we are passing email also with the link, to send mail to this email id
     }

     else{
       return res.json({
          message:"Sign up first"
        })
     }
   } catch (error) {
     res.status(5000).json({
      message:error.message
     })
   }
}
 

module.exports.resetPassword=async function resetPassword(req,res){
  try {
    const resettoken=req.params.token
    let(password,confirmPassword)=req.body
    const user=await User.findOne({resetToken:resettoken})//finding user based on resetToken
  
    if(user){//if user is found via unique refreshToken then let him change his password
      user.resetPasswordHandler(password,confirmPassword);//this custom function will save new password in db
      await user.save()//will save changed data
      res.json({
        message:"password changed succesfully please log in again"
      })
    }
    else{
      res.send('user not found')
    }
    
  } catch (error) {
    res.json({
      message:error.message
    })
  }
}


module.exports.logout= function logout(req,res){
  res.cookie('login',' ',{maxAge:1})//this login cookie will have no value to empty value-> ' ', just 1 milisecond is it's duration,so after that it will be deleted
  res.json({
    message:"user logged out succcessfully"
  })
}