const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

let timerId = null;

start.addEventListener("click", () => {
    console.log('start');
    timerId = setInterval(() => {
        body.style.background = getRandomHexColor();
        start.disabled = true;
    }, 1000);
});

stop.addEventListener("click", () => {
    console.log('stop');
    clearInterval(timerId);
    start.disabled = false;
});















