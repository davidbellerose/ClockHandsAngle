
// retreive the elements to be manipulated
var results = document.getElementById("degrees");
var hourValue = document.getElementById("hourValue");
var minuteValue = document.getElementById("minuteValue");

document.getElementById("btnSubmit").addEventListener("click",calculate);

function calculate(){

    // validate form values
    if (hourValue.value < 0 || hourValue.value > 23 || minuteValue.value < 0 || minuteValue.value > 59)
        {
            alert("Please enter a valid time.")
        }
    
    // convert 24 hour to 12 hour time
    if (hourValue.value > 11)
        {
            hourValue.value = hourValue.value - 12;
        }
    
    // The minute hand moves 6 degrees each minute:  360/60 = 6
    var minuteAngle = minuteValue.value * 6;

    // The hour hand moves 30 degrees each hour: 360/12 = 30
    // The hour hand moves an addtional 6 degrees for
    //     each addtional minute past the hour.
    var hourAngle = (hourValue.value * 30) + (minuteAngle / 12);
    

    // return the angle between hour and minute hands
    var angle = Math.abs(hourAngle - minuteAngle);

    //return the inside angle
    if (angle > 180)
        {
            angle = 360 - angle;
        }

    SetClockHands(hourAngle, minuteAngle);

    results.innerHTML = angle;
};

// this method draws the clock hands to the time input in the page.
function SetClockHands(hDeg, mDeg)
{
    var hourHand = document.getElementById("hourHand");
    var minuteHand = document.getElementById("minHand");
    
    hourHand.style.transform  = `rotate(${hDeg + 90}deg)`
    minHand.style.transform  = `rotate(${mDeg + 90}deg)`
}
