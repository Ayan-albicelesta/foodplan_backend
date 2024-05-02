const reviewModel= require('../models/review.models')
const planModel=require('../models/plan.models')

const mongoose=require('mongoose')

module.exports.getAllReviews=async function getAllReviews(req,res){
      try {
        const rev=await reviewModel.find()
        if(rev){
            return res.json({
                message:"these are all reviews",
                data:rev
            })
        }
        else{
            return res.json({
                message:"No reviews given till now"
            })
        }
      } catch (error) {
           return res.status(500).json({
            message:error.message
           })
      }
}


module.exports.top3Reviews=async function top3Reviews(req,res){
    try {
        const rev=await reviewModel.find().sort({
            rating:-1//-1 for assending order
        }).limit(3)

        if(rev){
            return res.json({
                message:"Top 3 revies",
                data:rev
            })
        }
        else{
            return res.json({
                message:"Insufficient reviews"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
           })
    }
}

module.exports.getPlanReviews=async function getPlanReviews(req,res){
    try {
        const planid=req.params.id//this is id of the plan
        let rev=await reviewModel.find()//will give all reviews
        let filtered_reviews=rev.filter(re=>re.plan._id==planid)
         

        if(filtered_reviews){
            return res.json({
                message:"retrived reviews",
                data:filtered_reviews
            })
        }
        else{
            return res.json({
                message:"Insufficient reviews"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
           })
    }
}

module.exports.createReviews=async function createReviews(req,res){
    try {
        const plan_id=req.params.plan

        const plan=await planModel.findById(plan_id)//this will giev a particular plan, upon which user can write reviews
        if(plan){

            let totalReviewBeforeUpdating=plan.numberOfReviews//getting total reviews before updating
            plan.numberOfReviews+=1;//updating toatal reviews

            let reviewToBECreated=await reviewModel.create(req.body)

            //this is the formula for updating avg rating(taken form chatGpt)
            plan.ratingAverage=((plan.ratingAverage*totalReviewBeforeUpdating)+req.body.rating)/plan.numberOfReviews

            await plan.save()

            return res.status(201).json({
                message: "Review created successfully",
                plan: plan,
                review: reviewToBECreated
            });
        }
        else{
            return res.status(404).json({
                message: "Plan not found, cannot create review for this plan"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
           })
    }
    
}

module.exports.updateReviews=async function updateReviews(req,res){
    try {
        let planid=req.params.id//here planid isnot using anywhere, plan id is creating a route basically

        let reviewid=req.body.id
        let dataToBeUpdated=req.body
        let rev=await reviewModel.findOneAndUpdate({_id:reviewid},dataToBeUpdated,{new:true})
        if(rev){
            return  res.json({
                message:"review updated succesfully",
                Data:rev
            })
        }
        else{
            return res.json({
                message:"reviews not found to update"
            })
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
     
}

module.exports.deleteReviews=async function deleteReviews(req,res){
    try {
        
        let review_id=req.body.id
        let rev=await reviewModel.findOneAndDelete(review_id)
        
        if(rev){
            return  res.json({
                message:"review deleted succesfully",
                Data:rev
            })
        }
        else{
            return res.json({
                message:"reviews not found to delete"
            })
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}
