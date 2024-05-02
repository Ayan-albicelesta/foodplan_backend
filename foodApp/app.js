const express = require("express");
const app = express();

const User=require('./models/user.models.js')
const planModel=require('./models/plan.models.js')

const cookieParser=require('cookie-parser')

 

app.listen(3000);
app.use(cookieParser())

//this is a middleeare function used in post method ,for converting data into json, that is coming fom frontend/clint/postman
app.use(express.json());

// let users = [
//   {
//     id: 1,
//     name: "jhon",
//   },
//   {
//     id: 2,
//     name: "Mia",
//   },
//   {
//     id: 3,
//     name: "Supra",
//   },
// ];
//this is a mini app
 
 
const userRouter=require('./Routers/user.router.js')
const planRouter=require('./Routers/plan.router.js')
const reviewRouter=require('./Routers/review.router.js')
const bookingRouter=require('./Routers/booking.router.js')


// const authRouter = require('./Routers/auth.router.js')
// app.use("/auth", authRouter);

app.use("/userData", userRouter);
app.use("/plans",planRouter)
app.use("/reviews",reviewRouter)
app.use('/booking',bookingRouter)
 


 

