let countdown;
const timerDisplay = document.querySelector('.display_time-left')
const endTime = document.querySelector('.display_end-time')
const buttons = document.querySelectorAll('[data-time]')

function timer(seconds) {
	// clear any existing timers
  clearInterval(countdown)

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds)
  displayEndTime(then)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if (secondsLeft <= 0) {
      clearInterval(countdown)
      return;
    }
    // display it
    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp)
  const hour = end.getHours()
  const minutes = end.getMinutes()
  // military time
  endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`
  
  // not military time
 /*  const adjustedHour = hour > 12 ? hour - 12 : hour;
  endTime.textContent = `Be back at ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}	` */
}

function startTimer(){
	const seconds = parseInt(this.dataset.time)
  timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e){
	e.preventDefault();
  const mins = this.minutes.value
  timer(mins * 60)
  this.reset()
})