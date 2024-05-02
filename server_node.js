const http=require('http')
const fs=require('fs')
 

const server=http.createServer((req,res)=>{
    // console.log(`created server`);
    // console.log(req.method);
    console.log(req.url);
    // res.setHeader('Content-Type', 'text/plain');
    // res.write('hellow pepcoders')
    // res.end()
    

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