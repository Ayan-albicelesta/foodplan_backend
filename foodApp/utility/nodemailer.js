const nodemailer = require("nodemailer");

 

module.exports.sendMail=async function sendMail(str,data){
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "ayan.khanracoder2001@gmail.com",
          pass: "hxjd axfv mxmw dgoa",//this password is generated from google
        },
      });
      
      var Osubject,Ohtml
      if(str=="signup"){
           Osubject=`Thank you for signing up ${data.name}`
           Ohtml=`<h1>Welcome to FoodApp,hungry grab the dish !!! <br></br>Here is your Name - ${data.name} and
           Email - ${data.email}</h1>`
      }
      else if(str=="resetpassword"){
        Osubject=`Reset Password`
        Ohtml=`<h1>FoodApp .com</h1> Here is link to reset your password ${data.resetPasswordLink}`
      }
      
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"FoodApp" <ayan.khanracoder2001@gmail.com>', // sender address
          to: data.email, // list of receivers
          subject: Osubject, // Subject line
        //   text: "Food App, your one stop destination to eat", // plain text body
          html:  Ohtml, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      }
      
      main().catch(console.error);
}
 
