
const planModel=require('../models/plan.models.js')

module.exports.getAllPlans=async function getAllPlans(req,res){
    try {
       
        let plans=await planModel.find()
        if(plans){
            return res.json({
                message:"All plans are retrived",
                PLANS:plans
            })
        }
        else{
            res.json({
                message:"plans not found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Server error"
        })
    }
}

module.exports.getPlans=async function getPlans(req,res){
    try {
        const id=req.params.id
        const plans=await planModel.findById(id)
        console.log(plans);
    
        if(plans){
             res.json({
                message:"got user's plan",
                data:plans
            })
        }
        else{
            //for user
            const client=req.get('User-Agent')
            if(client.includes("Mozilla")){
                res.send('<h1>Please subscribe to a plan</h1>')
            }
            //for  postman
            else{
                res.json({
                    message:"Please subscribe to a plan"
                })
            }
        }
    } catch (error) {
        return res.json({
            message:error.message
        })
    }
}

module.exports.createPlans=async function createPlans(req,res){
    try {
        let Data=req.body
        let plansToBeCreated=await planModel.create(Data)
        return res.json({
            message:"plans created succesfully",
            data:plansToBeCreated
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

module.exports.updatePlans=async function updatePlans(req,res){
    
    try {
         
        let plan_id=req.params.id
        let  data=req.body
        let dataToBeUpdated=await planModel.findOneAndUpdate({_id:plan_id},data,{new:true})
        if(dataToBeUpdated){ 
            return  res.json({
                message:"plans updated succesfully",
                Data:dataToBeUpdated
            })
            }
            else{
                return res.json({
                    message:"plans not found to update"
                })
            }
        
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

module.exports.deletePlans=async function deletePlans(req,res){
    try {
        let plan_id=req.params.id
        let dataToBeDeleted=await planModel.findByIdAndDelete(plan_id)
        if(dataToBeDeleted){
        return res.json({
            message:"plans  deleted succesfully",
            data:dataToBeDeleted
        })
        }
        else{
            return res.json({
                message:"plans not found to delete"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


module.exports.top3plans=async function top3plans(req,res){
    try {
        const plans=await planModel.find().sort({
            ratingAverage:-1
        }).limit(3)

        if(plans){
            console.log("kl");
        return res.json({
            message:"top 3 plans",
            data:plans
        })
        }
        else{
            return res.json({
                message:"Not enough plans"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}