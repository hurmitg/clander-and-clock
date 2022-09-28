//  ---> alarm js
{
const alarmArea = document.querySelector(".alarmArea");

let out = document.createElement("div");
out.setAttribute("class", "out");
alarmArea.appendChild(out);

let s = document.createElement("div");
    s.setAttribute("class", "s");
    alarmArea.appendChild(s);

let time = 0;
let beep;

let alarmsubmit =  document.getElementById('alarmsubmit');
alarmsubmit.addEventListener('click',setalarm1);


function setalarm1(){
    setalarm(0);
}

function setalarm(snooze)
{
    let alarm = document.getElementById('alarm');
    alarmtime = new Date(alarm.value);
    let hours = alarmtime.getHours();
    let minutes = alarmtime.getMinutes();

    // convert 24 hours format of time to 12 hours format
    let timeofday = (hours < 12) ? "AM" : "PM";
    hours = (hours > 12 ? hours - 12 : hours);
    hours = (hours == 0 ? 12 : hours);
    
    // padding with 0 if it is single digit
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;

    now = new Date();
    
    let timeToAlarm = alarmtime-now+snooze;
    console.log(timeToAlarm);
    if(timeToAlarm>0)
    {
        out.innerText = `Alarm is set for -> ${hours}:${minutes} ${timeofday}`;
        beep = setTimeout(() =>{
            console.log(timeToAlarm);
            ringbell();
        },timeToAlarm);
    }
    else
    {
        out.innerText = `Invalid Input`;
    }
}
function snooze(){
    
    audio.pause();
    s.innerText = `Alarm Snoozed for ${(time/60000)+1} minute(s)!`
    clearTimeout(beep);
    time += 60000;
    setalarm(time);
}

var audio = document.getElementById('my-audio');

function ringbell()
    {
       audio.play();
    }

function stop()
    {
        time = 0;
        audio.pause();
        clearTimeout(beep);
        out.innerText = ` `;
        s.innerText = ` `
    }
}

// ---> clock js
{
    const current = document.querySelector(".currentTime");
    
    function updateclock(){

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesdy", "Thursday", "Friday", "Saturday"];

    // get the current date and time
    let date = new Date();
    
    // extract year, month, day, hours, min and sec from date
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // convert 24 hours format of time to 12 hours format
    let timeofday = (hour < 12) ? "AM" : "PM";
    hour = (hour > 12 ? hour - 12 : hour);
    hour = (hour == 0 ? 12 : hour);
    
    // padding with 0 if it is single digit
    hour = (hour < 10 ? "0" : "") + hour;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    

    // setting the date and time   
    let datestr = hour + ":" + minutes + ":" + seconds + " " + timeofday;

    // providing output
    current.innerText = datestr;
    }

}


// ---> Calendar js
let date = new Date();

const displayCalendar = () => {

    date.setDate(1);

    const monthDays = document.querySelector('.days');

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
 
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let month =  months[date.getMonth()];
    let year = date.getFullYear();

    document.querySelector('.currentMonth').innerHTML = month;
    document.querySelector('.currentYear').innerHTML = "(" + year + ")";

    document.querySelector('.currentDate').innerHTML = new Date().toDateString();

    let days = "";

    for(let i = firstDayIndex; i > 0; i--){
        days += `<div class="prev-date">${prevLastDay - i + 1}</div>`;
    }

    for(let j = 1; j <= lastDay; j++){
        if(j === new Date().getDate()  && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()){
        days += `<div class="today">${j}</div>`
        } else{
       days += `<div>${j}</div>`;
       }
    }

    let x=1;
    for(let i = lastDayIndex+1; i < 14; i++){
    days += `<div class="next-date">${x}</div>`;
    x++;
    }

    monthDays.innerHTML = days;

} 

document.querySelector('.prev').addEventListener('click', () => {
    let x = date.setMonth(date.getMonth()-1);
    displayCalendar();
})

document.querySelector('.next').addEventListener('click', () => {
    date.setMonth(date.getMonth()+1);
    displayCalendar();
})

displayCalendar();