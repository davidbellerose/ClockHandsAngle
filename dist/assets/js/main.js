var results=document.getElementById("degrees"),hourValue=document.getElementById("hourValue"),minuteValue=document.getElementById("minuteValue");function calculate(){(hourValue.value<0||hourValue.value>23||minuteValue.value<0||minuteValue.value>59)&&alert("Please enter a valid time."),hourValue.value>11&&(hourValue.value=hourValue.value-12);var e=6*minuteValue.value,u=30*hourValue.value+e/12,t=Math.abs(u-e);t>180&&(t=360-t),SetClockHands(u,e),results.innerHTML=t}function SetClockHands(e,u){var t=document.getElementById("hourHand");document.getElementById("minHand");t.style.transform=`rotate(${e+90}deg)`,minHand.style.transform=`rotate(${u+90}deg)`}document.getElementById("btnSubmit").addEventListener("click",calculate);