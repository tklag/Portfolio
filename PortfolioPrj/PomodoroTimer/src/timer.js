//time
const phase = document.getElementById("phase");
const timer = document.getElementById("timer");
const totalTime = document.getElementById("total-time");
const round = document.getElementById("round");
const countMode = document.getElementById("count-mode");
countMode.addEventListener("change", ()=>clickMenuBtn(40));
const roundInput = document.getElementById("round-input");

//menu buttons
const darkTheme = document.getElementById("dark-theme");
const lightTheme = document.getElementById("light-theme");
let themeFlag; //true:dark false:light

/*
const langSwitch = document.getElementById("lang-switch");
const langJp = document.getElementById("lang-jp");
const langEn = document.getElementById("lang-en");
let langNum; //1:en 2:jp 3~:not assigned
*/

const audio = new Audio("src/sound/alarm.mp3");
const soundOn = document.getElementById("sound-on");
const soundOff = document.getElementById("sound-off");
let soundFlag; //true:On false:Off


//command buttons
const playBtn = document.getElementById("play-button");
const pauseBtn = document.getElementById("pause-button");
const stopBtn = document.getElementById("stop-button");
//const backBtn = document.getElementById("back-button");
let playFlag;

//state
/*
0: initial state
1: playing state
2: break state
3: completion state
*/
let state;

const pomodoroMin = 25; //pomodoro time period of minutes
const pomodoroSec = 0; //pomodoro time period of seconds
const pomodoroBreakMin = 5; //break time period of minutes
const pomodoroBreakSec = 0; //break time period of seconds
const countupLimit = 99;//max number of countup mode

let timerMin;
let timerSec;
let roundNum;
let totalTimeHour;
let totalTimeMin;
let totalTimeSec;
let roundLimit;
let countdownLimit;
let countmodeFlag;


//Initialization jQuery
$( document ).ready(function() {
    initialize();

    //menu buttons
    lightTheme.style.display = "none";
    themeFlag = true;
    /*
    langJp.style.display = "none";
    langNum = 1;
    */
    soundOff.style.display = "none";
    soundFlag = true;//default sound on
    countmodeFlag = true;//default countup
   
   //color theme(dark)
   $( "html" ).attr("data-bs-theme", "dark");

   //icon
   $( "#repeat-icon" ).css("display", "none");
});

const initialize = () => {
    manageState(0);
    //time
    timerMin = pomodoroMin;
    timerSec = pomodoroSec;
    timer.innerText = setTime(timerMin, timerSec);
    totalTimeHour = 0;
    totalTimeMin = 0;
    totalTimeSec = 0;
    totalTime.innerText = totalTimeHour.toString() + ":" + setTime(totalTimeMin, totalTimeSec);
    controlPhaseMessage(0);
    roundNum = 0;
    setRoundCounter();
    roundLimit = countupLimit;
    countdownLimit = 1;//default number of countdown mode[1:100)
    

    //command buttons
    
    //backBtn.disabled = true;
    
    $( "#stop-button" ).addClass( "disabledBtn" );
    
    stopBtn.disabled = true;
    //$( "#back-button" ).addClass( "disabledBtn" );
    $( "#count-mode" ).removeAttr("disabled");
    pauseBtn.style.display = "none";
    playBtn.style.display = "block";
    playFlag = false;
}

const clickMenuBtn = (val) => {
    switch(val){
        case 10://colortheme
            if(themeFlag){
                darkTheme.style.display = "none";
                lightTheme.style.display = "block";
                $( "html" ).removeAttr("data-bs-theme");
                $( "html" ).attr("data-bs-theme", "light");
            }else{
                darkTheme.style.display = "block";
                lightTheme.style.display = "none";
                $( "html" ).removeAttr("data-bs-theme");
                $( "html" ).attr("data-bs-theme", "dark");
            }
            themeFlag = !themeFlag;
            break;
        /*
        case 20://language
            if(langNum === 1){
                langJp.style.display = "inline-block";
                langEn.style.display = "none";
                langNum = 2;
            }else{
                langJp.style.display = "none";
                langEn.style.display = "inline-block";
                langNum = 1;   
            }
            break;
        */
        case 30://sound
            if(soundFlag){
                soundOn.style.display = "none";
                soundOff.style.display = "block";
            }else{
                soundOn.style.display = "block";
                soundOff.style.display = "none";
            }
            soundFlag = !soundFlag;
            audio.pause();
            audio.load();
            break;
        case 40://count mode
            if(countMode.value === "countup"){
                $( "#round-icon" ).css("display", "inline-block");
                $( "#repeat-icon" ).css("display", "none");
                $( "#round" ).css("display", "inline-block");
                $( "#round-input" ).css("display", "none");
                roundLimit = countupLimit;
                countmodeFlag = true;
            }else{
                $( "#round-icon" ).css("display", "none");
                $( "#repeat-icon" ).css("display", "inline-block");
                $( "#round" ).css("display", "none");
                $( "#round-input" ).css("display", "inline-block");
                roundLimit = countdownLimit;
                countmodeFlag = false;
            }
            break;
        default:
            console.log("ErrorCode:1000");
    }
};
const controlBtnDisp = (btn) => {
    switch(btn){
        //case backBtn:
        case playBtn:
            playBtn.style.display = "none";
            pauseBtn.style.display = "block";
            break;
        case pauseBtn:
            playBtn.style.display = "block";
            pauseBtn.style.display = "none";
            break;
        case stopBtn:
            playBtn.style.display = "block";
            pauseBtn.style.display = "none";
            break;
    }
}
const clickCommandBtn = (val) => {
    switch(val){
        /*
        case 1://back
            break;
        */
        case 2://play

            //initial click of play button
            if(state === 0){
                manageState(1);
                $( "#count-mode" ).attr("disabled", true);
                stopBtn.disabled = false;
                $( "#stop-button" ).removeClass( "disabledBtn" );
                /*
                backBtn.disabled = false;
                $( "#back-button" ).removeClass( "disabledBtn" );
                */
            }

            playFlag = !playFlag;
            controlBtnDisp(playBtn);
            controlPhaseMessage(1);
            
            if(!countmodeFlag){
                roundLimit = Number(roundInput.value);
                $( "#round-input" ).attr("disabled", true);
            }

            break;
        case 3://pause
            playFlag = !playFlag;
            controlBtnDisp(pauseBtn);
            controlPhaseMessage(2);
            break;
        case 4://stop
            playFlag = false;
            controlBtnDisp(stopBtn);
            controlPhaseMessage(2);
            if(confirm("Do you really want to finish?")){
                initialize();
            }
            break;
        default:
    }
}


const controlPhaseMessage = (val) =>{
    switch(val){
        case 0:
            phase.innerText = "Let's begin!";
            break;
        case 1:
            if(state === 1){
                phase.innerText = "Focus!";
            }else if(state === 2){
                phase.innerText = "Have a break!";
            }
            break;
        case 2:
            phase.innerText = "Pausing";
            break;
        default:
    }
}

const generateDispNum = (num) => {
    res = "";
    if(num < 10){
        res = "0" + num.toString(); 
    }else{
        res = num.toString();
    }
    return res;
}

const setTime = (min, sec) => {
    return generateDispNum(min) + ":" + generateDispNum(sec);
}

const setRoundCounter = () => {
    round.innerText = roundNum.toString();
}

const startTimer = () => {
    const timerCount = setInterval(count, 1000);
    function count(){
        

        //condition of continuing
        if(roundNum === roundLimit){
            if(!countmodeFlag){
                $( "#round-input" ).removeAttr("disabled");
            }
            clearInterval(timerCount);
            alert("Good job!");
            initialize();  
        }

        if(playFlag){
            if(timerSec === 0){
                if(timerMin === 0){
                    console.log("finish");
                }
                timerMin --;
                timerSec = 59;
            }else{
                timerSec --;
            }

            if(totalTimeSec !== 59){
                totalTimeSec ++;
            }else{
                if(totalTimeMin !== 59){
                    totalTimeMin ++;
                    totalTimeSec = 0;
                }else{
                    totalTimeHour ++;
                    totalTimeMin = 0;
                    totalTimeSec = 0;
                }
            }


            timer.innerText = setTime(timerMin, timerSec);
            totalTime.innerText = totalTimeHour + ":" + setTime(totalTimeMin, totalTimeSec);

            //go to break or next round
            if(timerMin === 0 && timerSec === 0){
                if(state === 1){
                    timerMin = pomodoroBreakMin;
                    timerSec = pomodoroBreakSec;
                    manageState(2);
                    controlPhaseMessage(1);
                    roundNum++;
                    if(countmodeFlag){
                        setRoundCounter();
                    }else{
                        roundInput.value = roundLimit - roundNum;
                    }
                }else if(state === 2){
                    timerMin = pomodoroMin;
                    timerSec = pomodoroBreakSec;
                    manageState(1);
                    controlPhaseMessage(1);
                }

                if(soundFlag){
                    audio.play();
                }
                
            }
            

        }else{
            clearInterval(timerCount);
        }
    }
}

const manageState  = (stateNum) => {
    switch(stateNum){
        case 0:
            state = 0;
            break;
        case 1:
            state = 1;
            break;
        case 2:
            state = 2;
            break;
        case 3:
            state = 3;
            break;
        default:
    }
}