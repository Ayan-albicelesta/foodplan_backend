const mongoose =require("mongoose");

const db_link ="mongodb+srv://ayankhanracoder:ayan1234@cluster0.u2vpa6e.mongodb.net/";

mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('Databse connected for reviews');
})
.catch(function(err){
   console.log(err);
})

const reviewSchema= mongoose.Schema({
      review:{
        type:String,
        required:[true,"Review is required"]
      },
      rating:{
        type:Number,
        min:1,
        max:10,
        required:[true,"Rating is requird"]
      },
      createdAt:{
        type:Date,
        default:Date.now()
      },
      user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,"review must be given by user"]
      },
      plan:{
        type:mongoose.Schema.ObjectId,
        ref:"planModel",
        required:[true,"Mention plan"]
      }
})

reviewSchema.pre('find',function(next){
    this.populate({
        path:'user',
        select:"name profileImage"
    }).populate('plan')
    next()
})

const reviewModel=mongoose.model("reviewModel",reviewSchema)

module.exports=reviewModel