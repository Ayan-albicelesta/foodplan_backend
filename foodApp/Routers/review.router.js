const express = require("express");
const reviewRouter=express.Router();

const { protectRoute} = require("../controller/authController.js");
const {getAllReviews,top3Reviews,getPlanReviews,createReviews,updateReviews,deleteReviews}=require('../controller/reviewController.js')

reviewRouter.route('/all').get(getAllReviews)

reviewRouter.route('/top3').get(top3Reviews)

reviewRouter.route('/:id').get(getPlanReviews)

reviewRouter.use(protectRoute)
reviewRouter.route('/crud/:plan').post(createReviews)

reviewRouter.route('/crud/:plan').patch(updateReviews).delete(deleteReviews)


module.exports=reviewRouter