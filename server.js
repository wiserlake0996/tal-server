var app = require('express')();
var Firebase = require('firebase');
var port = process.env.PORT || 8080;
var TimerCtrl = require('./controllers/TimerController');
var FirebaseUrl = 'https://luminous-torch-7893.firebaseio.com/Tal';
var FirebaseRef = new Firebase(FirebaseUrl); 
var emailBody = "";
var timerStatus = false;


// Firebase async callback listening for data update
FirebaseRef.on("value", function(snapshot){
    
    // collect data and check for items in remind list
    var totalItems = extractReminderItems(snapshot);
    
    if(totalItems > 0)
    {
        //if timer is on
        if(getTimerStatus() === true){
            stopTimer();
            TimerCtrl.setEmailBody(emailBody);
            startTimer();            
        }else{
            startTimer();   
        }
        
    }else{
        
        if(getTimerStatus() === true){
            stopTimer();
        }
    }
    
    console.log("Extract count "+ totalItems);
    //console.log("Extract email "+ emailBody+"\n");
});


// copy data added to remind list
var extractReminderItems = function(snap){
    var items = []
    emailBody = "";
    snap.forEach((child) => {
        
        if (child.val().status === true){
            items.push({
                name: child.val().name,
                _key: child.key(),
                date_posted: child.val().date_posted,
                status: child.val().status
            });
            emailBody += "<p>"+child.val().name +"</p>";           
        }

    }); 
    
    return items.length;   
};


// start Timer
var startTimer = () =>{
    setTimerStatus(true);
    TimerCtrl.setEmailBody(emailBody);
    TimerCtrl.timerStart();
    console.log("Timer has started!");    
}

// stop Timer
var stopTimer = () =>{
    console.log("Timer has stopped!");
    TimerCtrl.timerStop();
    setTimerStatus(false);
}

// check timer status
var getTimerStatus = () =>{
    return timerStatus;
}

var setTimerStatus = (val) =>{
    timerStatus = val;
    console.log("current timer status set to "+ timerStatus);
}

app.listen(port);
console.log("Server started!! \n\n");