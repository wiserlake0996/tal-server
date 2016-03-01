var sendEmail = require("./email");
var emailBody = "";

var timerObject = null;
var timerLoopCount = 0;

var timerStart = () =>{
    timerLoopCount = 3;
    var interval = generateRandomIntervalTime(3600000, 12000000);
    
    var mailOptions = {
        from: "talflux@gmail.com", // sender address
        to: "wiserlake0996@gmail.com", // list of receivers
        subject: "Daily Tal Flux Reminder", // Subject line
        text:  emailBody, // plaintext body
        html: emailBody // html body
    };    
    
    console.log("STARTING TIMER \n")
    timerObject = setInterval(() =>{
        console.log("Timer Interval \n");
        
        sendEmail(mailOptions);
        timerLoopCount--;
        checkTimerLoopCount();
    }, interval);
};

var timerStop = () =>{
    clearInterval(timerObject);
    console.log("TIMER HAS STOPPED \n")
}


var checkTimerLoopCount = () =>{
    console.log("checking timer loop count \n");
    if(timerLoopCount > 0){
        console.log("Loop count value is still good! \n");
        
    }else{
        console.log("value 0 or less, stopping the timer \n");
        timerStop();
    }
    
}

var generateRandomIntervalTime = (min, max) =>{
    var randVal =  Math.floor(Math.random() * (max - min+1)) + min;
    console.log("Random value generated = " + randVal);
    return randVal;
}

var setEmailBody = (body) =>{
    emailBody = body;
}


module.exports = {
    timerStart: timerStart,
    timerStop: timerStop,
    setEmailBody: setEmailBody
}
