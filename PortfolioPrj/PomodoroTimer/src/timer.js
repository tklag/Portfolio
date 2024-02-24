const countMode = document.getElementById("count-mode");
countMode.addEventListener("change", ()=>clickMenuBtn(40));

/*Class definitions*/
class Timer{
    constructor(){
        this.min = 0;
        this.sec = 5;
        this.breakMin = 0;
        this.breakSec = 5;
        this.totalHour = 0;
        this.totalMin = 0;
        this.totalSec = 0;
        this.currentMin = this.min;
        this.currentSec = this.sec;
        this.state = false;
        this.playFlag = true;
        this.timer = document.getElementById("timer");
        this.totalTime = document.getElementById("total-time");
    }
    getState(){
        return this.state;
    }
    setState(){
        this.state = !this.state;
    }

    setTime(min, sec){
        this.timer.innerText = this.generateDispTime(min) + ":" + this.generateDispTime(sec);
    }
    resetTime(){
        this.currentMin = this.min;
        this.currentSec = this.sec;
        this.setTime(this.currentMin, this.currentSec);
    }
    setTotalTime(hour, min, sec){
        this.totalTime.innerText = this.generateDispTime(hour) + ":" + this.generateDispTime(min) + ":" + this.generateDispTime(sec);
    }
    resetTotalTime(){
        this.totalHour = 0;
        this.totalMin = 0;
        this.totalSec = 0;
        this.setTotalTime(this.totalHour,this.totalMin,this.totalSec);
    }
    loopTime(playFlag){
        if(playFlag){
            this.currentMin = this.min;
            this.currentSec = this.sec;
        }else{
            this.currentMin = this.breakMin;
            this.currentSec = this.breakSec;
        }
    }
    generateDispTime(num){
        let res = "";
        if(num < 10){
            res = "0" + num.toString(); 
        }else{
            res = num.toString();
        }
        return res;
    }
    getTimeInfo(){
        return [this.min, this.sec, this.totalHour, this.totalMin, this.totalSec, this.currentMin, this.currentSec, this.breakMin, this.breakSec];
    }
    count(){
        if(this.currentSec === 0){
            if(this.currentMin === 0){
                this.playFlag = !this.playFlag;
                console.log("finish");
            }
            this.currentMin --;
            this.currentSec = 59;
        }else{
            this.currentSec --;
        }

        if(this.totalSec !== 59){
            this.totalSec ++;
        }else{
            if(this.totalMin!== 59){
                this.totalMin ++;
                this.totalSec = 0;
            }else{
                this.totalHour ++;
                this.totalMin = 0;
                this.totalSec = 0;
            }
        }
    }
}
const timerObj = new Timer();

class RoundManager{
    constructor(){
        this.roundEl = document.getElementById("round");
        this.roundInputEl = document.getElementById("round-input");
        this.roundNum = 0;
        this.roundLimit = 99;
    }
    getRoundLimit(){
        return this.roundLimit;
    }
    getRoundNum(){
        return this.roundNum;
    }
    setRoundLimit(num){
        this.roundLimit = num;
    }
    setRoundNum(num){
        if(num === 0){
            this.roundNum = 0;
        }else{
            this.roundNum ++;
        }
    }
    lockRoundInput(){
        $( "#round-input" ).attr("disabled", true);
    }
    releaseRoundInput(){
        $( "#round-input" ).removeAttr("disabled");
    }
    showRoundNum(){
        if(modeCtr.getCountMode()){
            this.roundEl.innerText = this.roundNum.toString();
        }else{
            this.roundInputEl.value = this.roundLimit - this.roundNum;
        }
    }

}
const roundMgr = new RoundManager();

class ModeController{
    constructor(){ 
        this.currentCountMode = true;
    }
    getCountMode(){
        return this.currentCountMode;
    }
    setCountMode(){
        if(this.currentCountMode){
            $( "#round-icon" ).css("display", "none");
            $( "#repeat-icon" ).css("display", "inline-block");
            $( "#round" ).css("display", "none");
            $( "#round-input" ).css("display", "inline-block");
        }else{
            $( "#round-icon" ).css("display", "inline-block");
            $( "#repeat-icon" ).css("display", "none");
            $( "#round" ).css("display", "inline-block");
            $( "#round-input" ).css("display", "none");
        }
        this.currentCountMode = !this.currentCountMode;
    }
    lockCountMode(){
        $( "#count-mode" ).attr("disabled", true);
    }
    releaseCountMode(){
        $( "#count-mode" ).removeAttr("disabled");
    }
}
const modeCtr = new ModeController();

class Message{
    
    constructor(){
        this.messageEl = document.getElementById("phase");
        this.currentMessage = "";
        this.setMessage(0);
    }

    setMessage(eventNum){
        switch(eventNum){
            case 0:
                this.currentMessage = "Let's begin!";
                break;
            case 1:
                if(stateCtr.getState() === 1){
                    this.currentMessage = "Focus!";
                }else if(stateCtr.getState()=== 2){
                    this.currentMessage = "Have a break!";
                }
                break;
            case 2:
                this.currentMessage = "Pausing";
                break;
            default:
        }
        this.messageEl.innerText = this.currentMessage;
    }
}
const msg = new Message();

class StateController{
    constructor(){
        this.iniState = 0;
        this.playingState = 1;
        this.breakState = 2;
        this.compState = 3; 
        this.pauseState = 4;
        this.currentState = this.iniState;
    }
    
    getState(){
        return this.currentState;
    }
    setState(eventNum){
        switch(eventNum){
            case 0:
                this.currentState = this.iniState;
                break;
            case 1:
                this.currentState = this.playingState;
                break;
            case 2:
                this.currentState = this.breakState;
                break;
            case 3:
                this.currentState = this.compState;
                break;
            case 4:
                this.currentState = this.pauseState;
            default:
        }
    }
}
const stateCtr = new StateController();

class SoundController{
    constructor(){
        this.audio = new Audio("src/sound/alarm.mp3");
        this.soundOnDisp = document.getElementById("sound-on");
        this.soundOffDisp = document.getElementById("sound-off");
        this.currentSound = true;
        this.soundOffDisp.style.display = "none";
    }
    getSound(){
        return this.currentSound;
    }
    setSound(){
        this.currentSound = !this.currentSound;
        if(this.currentSound){
            this.soundOnDisp.style.display = "block";
            this.soundOffDisp.style.display = "none";
        }else{
            this.soundOnDisp.style.display = "none"
            this.soundOffDisp.style.display = "block";
            this.stopAlarm();
        }
    }
    playAlarm(){
        this.audio.play();
    }
    stopAlarm(){
        this.audio.pause();
        this.audio.load();
    }
}
const soundCtr = new SoundController;

class ColorThemeCtr{
    constructor(){
        this.darkThemeIcon = document.getElementById("dark-theme");
        this.lightThemeIcon = document.getElementById("light-theme");
        this.colorTheme = true;
        $( "html" ).attr("data-bs-theme", "dark");
        this.lightThemeIcon.style.display = "none";
    }

    setColorTheme(){
        if(this.colorTheme){
            this.darkThemeIcon.style.display = "none";
            this.lightThemeIcon.style.display = "block";
            $( "html" ).removeAttr("data-bs-theme");
            $( "html" ).attr("data-bs-theme", "light");
        }else{
            this.darkThemeIcon.style.display = "block";
            this.lightThemeIcon.style.display = "none";
            $( "html" ).removeAttr("data-bs-theme");
            $( "html" ).attr("data-bs-theme", "dark");
        }
            
        this.colorTheme = !this.colorTheme;
    }
}
const colorCtr = new ColorThemeCtr;

class CommandBtn{
    constructor(){
        this.playBtn = document.getElementById("play-button");
        this.pauseBtn = document.getElementById("pause-button");
        this.stopBtn = document.getElementById("stop-button");
    }
    getBtn(name){
        switch(name){
            case "play":
                return this.playBtn;
            case "pause":
                return this.pauseBtn;
            case "stop":
                return this.stopBtn;
            default:
        }
    }

    dispNone(id){
        $(id).css("display", "none");
    }
    btnEnable(id, btn){
        $(id).removeClass( "disabledBtn" );
        btn.disabled = false;
    }
    btnDisabled(id, btn){
        $(id).addClass( "disabledBtn" );
        btn.disabled = true;
    }
    
    dispCommandBtn(btn, flag){
        if(flag){
            btn.style.display = "block";
        }else{
            btn.style.display = "none";
        }
    }
}
const cmdBtn = new CommandBtn();

//Initialization jQuery
$( document ).ready(function() {
    initialize();
    stateCtr.setState(0);
    cmdBtn.dispNone("#repeat-icon");
});

const initialize = () => {
    timerObj.resetTotalTime();
    timerObj.resetTime();
    roundMgr.setRoundNum(0);
    roundMgr.showRoundNum();
    msg.setMessage(0);
    cmdBtn.btnDisabled("#stop-button", cmdBtn.getBtn("stop"));
    modeCtr.releaseCountMode();
    cmdBtn.dispCommandBtn(cmdBtn.getBtn("pause"), false);
    cmdBtn.dispCommandBtn(cmdBtn.getBtn("play"), true);
}

const clickMenuBtn = (val) => {
    switch(val){
        case 10://colortheme
            colorCtr.setColorTheme()
            break;
        case 30://sound
            soundCtr.setSound();
            break;
        case 40://count mode
            modeCtr.setCountMode();
            break;
        default:
            console.log("ErrorCode:1000");
    }
};

const clickCommandBtn = (val) => {
    switch(val){
        case 2://play
            //initial click of play button
            if(stateCtr.getState() === 0){
                modeCtr.lockCountMode();
                cmdBtn.btnEnable("#stop-button", cmdBtn.getBtn("stop"));
            }
            stateCtr.setState(1);
            cmdBtn.dispCommandBtn(cmdBtn.getBtn("play"), false);
            cmdBtn.dispCommandBtn(cmdBtn.getBtn("pause"), true);
            msg.setMessage(1);
            if(!modeCtr.getCountMode()){
                roundMgr.setRoundLimit(Number(roundMgr.roundInputEl.value));
                roundMgr.lockRoundInput();
            }
            break;
        case 3://pause
            stateCtr.setState(4);
            cmdBtn.dispCommandBtn(cmdBtn.getBtn("play"), true);
            cmdBtn.dispCommandBtn(cmdBtn.getBtn("pause"), false);
            msg.setMessage(2);
            soundCtr.stopAlarm();
            break;
        case 4://stop
            stateCtr.setState(4);
            cmdBtn.dispCommandBtn(cmdBtn.getBtn("play"), true);
            cmdBtn.dispCommandBtn(cmdBtn.getBtn("pause"), false);
            msg.setMessage(2);
            soundCtr.stopAlarm();
            if(confirm("Do you really want to finish?")){
                initialize();
                stateCtr.setState(0);
            }
            break;
        default:
    }
}

const startTimer = () => {
    const timerCount = setInterval(count, 1000);
    function count(){
        
        //condition of continuing
        if(roundMgr.getRoundNum() === roundMgr.getRoundLimit()){
            if(!modeCtr.getCountMode()){
                roundMgr.releaseRoundInput();
            }
            clearInterval(timerCount);
            alert("Good job!");
            initialize();  
            stateCtr.setState(0);
        }
        
        if(stateCtr.getState() === 1 || stateCtr.getState() === 2){
            timerObj.count();
            timerObj.setTime(timerObj.getTimeInfo()[5],timerObj.getTimeInfo()[6]);
            timerObj.setTotalTime(timerObj.getTimeInfo()[2], timerObj.getTimeInfo()[3], timerObj.getTimeInfo()[4]);
            //go to break or next round
            if(timerObj.getTimeInfo()[5] === 0 && timerObj.getTimeInfo()[6] === 0){
                if(stateCtr.getState() === 1){
                    timerObj.loopTime();
                    stateCtr.setState(2);
                    msg.setMessage(1);
                    roundMgr.setRoundNum(1);
                    if(modeCtr.getCountMode()){
                        roundMgr.showRoundNum();
                    }else{
                        roundMgr.showRoundNum();
                    }
                }else if(stateCtr.getState() === 2){
                    timerObj.loopTime();
                    stateCtr.setState(1);
                    msg.setMessage(1);
                }
                if(soundCtr.getSound()){
                    soundCtr.playAlarm();
                }
            }
        }else{
            clearInterval(timerCount);
        }
    }
}

