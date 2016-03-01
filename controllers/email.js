var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var options = {
    service: 'gmail',
    auth: {
        user: "talflux@gmail.com",
        pass: "fingertipfeel"
    }
  };
  
var transporter = nodemailer.createTransport(smtpTransport(options))  

var sendMail = function(mailOptions){
    transporter.sendMail(mailOptions, function(error, response){
        if(error){
            console.log("email sending error "+error);
        }else{
            console.log("Message sent! ");
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });     
}

module.exports = sendMail;  