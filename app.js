const express= require('express')

const app=express()

app.get('/',(req,res)=>{
    res.send(`Hello world`)
})

//sending file with relative path
app.get('/about',(req,res)=>{
    res.sendFile(`E:\\Backend_pepcoding\\views\\index.html`)
})

//sending file with the relative path 
app.get('/about-me',(req,res)=>{
    res.sendFile('./views/about.html',{root:__dirname})
})

//redirecting
app.get('/why-messi',(req,res)=>{
    res.redirect(`https://www.messivsronaldo.app`)
})


//app.use() is a kind of middleware
//404 page-->this will only execute when upper routes will not work, thats why we have used the error file at the last
app.use((req,res)=>{
    res.status(404).sendFile('./views/404_error.html',{root:__dirname})
})
 
app.listen(3000,()=>{
    console.log(`listening on port 3000`);
})


