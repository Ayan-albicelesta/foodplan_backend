const mongoose=require('mongoose')

const bcrypt=require('bcrypt')


const db_link ="mongodb+srv://ayankhanracoder:ayan1234@cluster0.u2vpa6e.mongodb.net/";

mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('Databse connected for plans');
})
.catch(function(err){
   console.log(err);
})


const planSchema= mongoose.Schema({
      name:{
        type:String,
        required:true,
        unique:true,
        maxLength:[20,"plan name should not exceed 20 character"]
      },
      price:{
        type:Number,
        required:[true,"Price not entered"]
      },
      duration:{
        type:Number,
        require:true
      },
      ratingAverage:{
        type:Number
      },
      discount:{
        type:String,
        validate:[function(){ return this.discount<100}, "discount should exceed price"]
      },
      numberOfReviews:{
        type:Number,
        default:0
      }

})

const planModel=mongoose.model("planModel",planSchema)

/*
;(async function createPlan(){
   let planObj={
      name:"plan1",
      price:200,  
      duration:30,
      ratingAverage:4,
      discount:20

   }
   let data= await planModel.create(planObj)
   console.log(data);

   //anoter way create new objext and save to db
//    const doc=new planModel(planObj);
//    await doc.save()
})();
*/

module.exports=planModel