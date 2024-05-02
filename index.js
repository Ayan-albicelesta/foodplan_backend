console.log(`discipline > motivation`);
console.log(`do it`);

const http=require('http')
const fs=require('fs')
const _ = require('lodash');

const server=http.createServer((req,res)=>{
    // console.log(`created server`);
    // console.log(req.method);
    // console.log(req.url);
    // res.setHeader('Content-Type', 'text/plain');
    // res.write('hellow pepcoders')
    // res.end()

    let num = _.random(0, 20); // Use Lodash function
    console.log(num);

     
    const greetingOnce = _.once(() => {
        console.log(`sionara`);
      })
      
      greetingOnce(); // Prints "sionara"
      greetingOnce(); // No output
      


     path='./views'

     switch (req.url){
        case '/':
         path+='/index.html'
         res.statusCode=200
         break
        case '/about':
         path+='/about.html' 
         res.statusCode=200
         break
        case '/about-me':
            res.writeHead(302, { 'Location': 'https://example.com/new-location' }); 
        default:
         path+='/error.html' 
         res.statusCode=404
         break
     }


    fs.readFile(path,(err,fileData)=>{
        if(err){
            console.log(err);
        }
        else{
            res.write(fileData)
            res.end()
        }
    })
})

server.listen(3000,()=>{
    console.log(`server is listening on port 3000`);
})