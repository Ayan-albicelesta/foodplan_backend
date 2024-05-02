const express= require('express')

const app=express()

app.listen(3000)

//this is a middleeare function used in post method ,for converting data into json, that is coming fom frontend/clint/postman
app.use(express.json())

 
/*

let  users={}

app.get('/userData',(req,res)=>{
    res.send( users)
})

app.post('/userData',(req,res)=>{
    console.log(req.body);

     for(key in req.body){
         users[key]=req.body[key]
     }
     console.log( users);

    res.json({
        message:"hi bitch",
        user:req.body
    })
})


app.patch('/userData',(req,res)=>{
    console.log(req.body);
    let dataToBeUpdated=req.body;

     for(key in dataToBeUpdated){
         users[key]=dataToBeUpdated[key]
     }
     
     console.log(` users :`, users);
     res.send(`data has been updated successfully`)
})
 
//logicalluy here we are uapdating  users in post and patch both



app.delete('/userData',(req,res)=>{
     users={}
    res.status(200).json({ //this is called chaining
        message:"user data is deleted successfully"
    })
})


// queries(used for filtering)
app.get('/userDataaaa',(req,res)=>{
    console.log(req.query);

    //here name and age parameter is taken, as both are send from postman, make sure whaenever executing this code part these two queries
    //have to be mentioned in the route
    // console.log(req.query.name);
    // console.log(req.query.age);

    res.send(`data is send now collect the data by using quiries`)
})

//parameters
app.get('/userData/:id/:username',(req,res)=>{
    console.log(req.params);
    console.log(req.params.id);
    console.log(req.params.username);
    res.status(200).send(`user data is received`)
})
*/


let  users=[
    {
        id:1,
        name:"jhon"
    },
    {
        id:2,
        name:"Mia"
    },
    {
        id:3,
        name:"Supra"
    }
]
//this is a mini app
const  userRouter=express.Router()
app.use('/userData', userRouter)

 userRouter
.route('/')
.get(middleware1,getuser,middleware2)
.post(postuser)
.patch(updateuser)
.delete(deleteuser)

 userRouter
.route('/:id/:username')
.get(userdataParameter)

 
function middleware1(req,res,next){
    console.log('middleware1 encountered');
    next()
}

function middleware2(req,res){
    console.log('middleware2 encountered');
    // next()
    console.log('middlware2 ended req res cycle');
    res.send(users)
}

function getuser(req,res,next){
    console.log('getuser is called');
    next()
    // res.send( users)
}

function postuser(req,res){
    console.log(req.body);

    
    users.push(req.body)//as users is an array
    console.log( users);

    res.json({
        message:"hi bitch",
        user:req.body
    })
}

function updateuser(req,res){
    console.log(req.body);
    let dataToBeUpdated=req.body;

     users.push(req.body)//as users is an array

     console.log(" users", users);
     res.send(`data has been updated successfully`)
}


function deleteuser(req,res){
     users=[]
    res.status(200).json({ //this is called chaining
        message:"user data is deleted successfully"
    })
}

function userdataParameter(req,res){
    console.log(req.params);
    console.log(req.params.id);
    console.log(req.params.username);
    res.status(200).send(`user data is received`)
}

