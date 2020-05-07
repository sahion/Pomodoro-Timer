const buttons = document.querySelectorAll('.buttons button');
const timer = document.querySelector('.timer');
const pomodoro = document.querySelector('.pomodoroNumber');

let workMinutes = 0.05;
let breakMinutes = 0.07;
seconds = workMinutes * 60;

workStatus = true;

pomodoroCount=1;


let interval;

let started = false;

const startTimer = () =>  {
  interval=setInterval(changeEverySecond,1000);
  pomodoro.textContent=`Pomodoro Number ${pomodoroCount}`;
}

function changeEverySecond(){

  displayTimer();

  seconds--;

  if (seconds<0){
    
    if (workStatus){
      seconds = (pomodoroCount % 4 == 0)? breakMinutes * 60 * 3:breakMinutes * 60;
      workStatus=false;
      pomodoro.textContent=`Break number ${pomodoroCount}`;
    } else {
      pomodoroCount++;
      workStatus=true;
      seconds = workMinutes * 60;
      pomodoro.textContent=`Pomodoro number ${pomodoroCount}`;
    }

  }

}


function displayTimer () {
  let nowMinutes = Math.floor(seconds / 60);
  let nowSeconds = Math.floor(seconds % 60);
  timer.textContent = `${(nowMinutes < 10)?"0"+nowMinutes:nowMinutes}:${(nowSeconds < 10)?"0"+nowSeconds:nowSeconds}`
  document.title = ((workStatus)?`Pomodoro Work - `: `Pomodoro Break - `)+`${timer.textContent}`;
}


function choiceAction(e){
  switch (e.target.textContent.toLowerCase()){
    
    case 'start':
      (!started) ? startTimer(): null ;
      started = true;
      break;
    case 'stop':
      seconds = workMinutes * 60;
      displayTimer();
      clearInterval(interval);
      started = false;
      pomodoro.textContent=``;
      document.title = `Pomodoro Timer`;
      break;
    case 'pause':
      clearInterval(interval);
      started = false;
      break;
    }
}












buttons.forEach(button => addEventListener('click',choiceAction));