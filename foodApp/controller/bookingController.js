let SK="sk_test_51P0plCSDx2EqwYddQjhWBuAAESghfQZNvAbl5icIDVkRJIlt38djbwCxoW7Z3TGVn1DLZ2YHbTai09fTWy5By1YQ00yRDNEIey" //this is seccret key of Stripe API

const stripe = require('stripe')(SK);

const planModel=require('../models/plan.models')
const userModel=require('../models/user.models')

module.exports.createSession= async function createSession(req,res){
    try {
        console.log(9);
        let userId=req.id
        console.log(78);
        let planId=req.params.id
console.log(7);
        const user= await userModel.findById(userId)
        const plan=await planModel.findById(planId)

        const session = await stripe.checkout.session.create({
            payment_method_types:['card'],
            customer_email:user.email,
            clint_reference_id:plan.id,

            line_items:[{
                name:plan.name,
                // description:plan.description //this description is not in plan model check onec what is the case
                amount:plan.price*100,
                currency:"inr",
                quantity:1
             }
            ],
            success_url: `${req.protocol}://${req.get("host")}/profile`,
            cancel_url: `${req.protocol}://${req.get("host")}/profile`,
        })

        res.status(200).json({
            status:"Success",
            
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            
        })
    }
}