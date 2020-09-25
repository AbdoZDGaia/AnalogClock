const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");

var date = new Date();

let hr = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();
//360 is the full cycle, 60 is the minutes portion of the full cycle
let hrPosition = (hr * 360 / 12) + ((min * 360 / 60) / 12);
//360 is the full cycle, 60 is the minute portion of the full cycle, and the other 60 is the sec portion within the min portion
let minPosition = (min * 360 / 60) + ((sec * 360 / 60) / 60);
//360 is the full cycle, 60 is the seconds portion of the full cycle
let secPosition = sec * 360 / 60;

//This version is prone to fault, as it relies on the browser's captured date.
//Openning another tab for example and playing around a little then coming back to the clock tab will throw off the time.
//Fixing this relies on ditching the "transformation" css and calling the date within the function.
//If you decide otherwise to call the date within this function you will end up having the return to zero glitch after a full minute cycle.
function runTheClock() {
    //30 is the outcome of 360/12, 3600 is how many seconds we have within an hour, and 30/3600 is 3/360
    hrPosition = hrPosition + (3 / 360)
        //1/60th of the minutes hand  times 6 is 6/60, to get the elapsed seconds in minutes-term then add them to the mins
    minPosition = minPosition + (6 / 60);
    //6 is the outcome of dividing 360 "total degrees of the full clock round" over 60 "total seconds within a full minute"
    secPosition = secPosition + 6;

    HOURHAND.style.transform = `rotate(${hrPosition}deg)`;
    MINUTEHAND.style.transform = `rotate(${minPosition}deg)`;
    SECONDHAND.style.transform = `rotate(${secPosition}deg)`;
}

var interval = setInterval(runTheClock, 1000);