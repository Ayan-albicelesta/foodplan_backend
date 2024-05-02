 

// authRouter
// .route("/sign-up")
// .get(getSignup)
// .post(postSignup);

// authRouter
// .route('/login')
// .post(logInUser)



 

// function getSignup(req, res) {
//   res.sendFile("public/index.html", { root: __dirname });
// }

// async function postSignup(req, res) {
//   let obj = req.body;
// //   console.log("backend", obj);
//  let data= await User.create(obj)

//   res.json({
//     message: "user data is received",
//     data: obj,
//   });
// }

// async function logInUser(req,res){

//     try {
//         let data=req.body
//         console.log(data.email);
//        if (data.email) {//if email is present

//          let user= await User.findOne({email:data.email})
//          if(user){//if user is found in database
//              if(user.password==data.password){//if password given by user matches with database password
//                    console.log('logged in succesfully');

//                    let uid=user['_id']//unique id in db, will use is as payload

//                    //jwt>sign() will generate JWT, so token will consist the JWT
//                    let token=jwt.sign({payload:uid},JWT_KEY)//first argument is payload,second is secret key, here by default header/algo is 'sha256'
//                  //const token=jwt.sign({payload:uid},JWT_KEY,{algorithm:'RS256})//here header/algo is explicitly mentionde as {algorithm:'RS256}

//                  res.cookie('login',token,{httpOnly:true});
//                     return res.json({
//                      message:"User has logged in",
//                      userDetails:data
//                     })
//              }
//              else{
//                  return res.json({
//                      message:"Wrong password"
//                  })
//              }
//          }
//          else{
//              return res.json({
//                  message:"User not found"
//              }) 
//          }
//        } 
//        else {//password not there
//           res.json({
//             message:"wrong credential"
//           })
//        }
//     } 
    
//     catch (error) {
//          return res.status(500).json({
//             Message:error.message
//          })
//     }

// }

// module.exports=authRouter 