const express = require("express");
const planRouter=express.Router();

const { protectRoute, isAuthorised } = require("../controller/authController.js");
const {getAllPlans,getPlans,createPlans,updatePlans,deletePlans, top3plans}=require('../controller/planController.js') 

planRouter
.route('/allPlans')
.get(getAllPlans)
 

//for own plan logged in have to be necessary--that is why protectroute is use 
planRouter.use(protectRoute)
planRouter
.route('/plan/:id')
.get(getPlans)

//planRouter.use(protectRoute) middlleware is previously used to get person's plan so authorising for login is alredy checked from there,
//if protectRoute  middlwware was not use before, we had to use here, cause firstly you have to be logged in
planRouter.use(isAuthorised(['admin','restaurantowner']))//this middleware is used for checking if person are authorised to change plans
planRouter
.route('/crudPlan')
.post(createPlans)

planRouter.route('/crudPlan/:id')
.patch(updatePlans)
.delete(deletePlans)

planRouter
.route('/top3')
.get(top3plans)

module.exports=planRouter