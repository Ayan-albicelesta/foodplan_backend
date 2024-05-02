
// //  let flag=false

// const jwt=require('jsonwebtoken');
// const JWT_KEY=require('../../secrets.js')//this is secret key
// function protectRouter(req,res,next){
//     if(req.cookies.login){
//       console.log(req.cookies.login);

//       let isVerified=jwt.verify(req.cookies.login,JWT_KEY)
//       if (isVerified) {
//          next()
//       } else {
//          res.json({
//             message:"user not verified"
//          })
//       }
     
//     }
//     else{
//      return res.json({
//        message:'operation not allowed'
//      })
//     }
//  }

//  module.exports=protectRouter