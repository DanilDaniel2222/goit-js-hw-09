
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateField = document.querySelector("#datetime-picker");
const startButton = document.querySelector('button[data-start]');

const ref = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

startButton.disabled = true;

let countDownTime = null;
let deltaTime = null;
let timerID;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const startDate = new Date();
        if(selectedDates[0] - startDate < 0){
            startButton.disabled = true;
            Notify.failure("Please choose a date in the future");
        }
        else{
            startButton.disabled = false;
            countDownTime = selectedDates[0];
        }
    },
  };

  flatpickr(dateField, options);

  startButton.addEventListener("click", onStart);

  function onStart(event){
    startButton.disabled = true;
    dateField.disabled = true;

    timerID = setInterval(() => {
        const currentDate = Date.now();
        deltaTime = countDownTime - currentDate;
        const time = convertMs(deltaTime);
        updateTimer(time);
    }, 1000);
  }

  function updateTimer({ days, hours, minutes, seconds }){
    if(deltaTime < 0){
        clearInterval(timerID);
        startButton.disabled = false;
        dateField.disabled = false;
        return;
    }

    ref.days.textContent = `${days}`;
    ref.hours.textContent = `${hours}`;
    ref.minutes.textContent = `${minutes}`;
    ref.seconds.textContent = `${seconds}`;
  }

  function addLeadingZero(value){
    return String(value).padStart(2, "0");
  }

  function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

  
























