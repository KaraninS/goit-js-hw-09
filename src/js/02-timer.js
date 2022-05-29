import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    areaForInputDate: document.querySelector('#datetime-picker'),
    buttonStart: document.querySelector('[data-start]'),
    daysInfo: document.querySelector('[data-days]'),
    hoursInfo: document.querySelector('[data-hours]'),
    minutesInfo: document.querySelector('[data-minutes]'),
    secondsInfo: document.querySelector('[data-seconds]'),
}
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(refs.areaForInputDate, options);

refs.areaForInputDate.addEventListener('input', getDateInInput);
refs.buttonStart.addEventListener('click', addStartTimer);

function getDateInInput(event) {
  const date = options.defaultDate;
  const inputNumber = new Date(event.currentTarget.value);

  if (inputNumber.getTime() < date.getTime()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    refs.buttonStart.setAttribute('disabled', 'disabled');
  } else {
    refs.buttonStart.removeAttribute('disabled');
  }
}
function addStartTimer() {
    timerId = setInterval(() => {
    const date = new Date(refs.areaForInputDate.value);
    const liveDate = new Date();
    let different = date - liveDate.getTime();
    convertMs(different);
    refs.buttonStart.setAttribute('disabled', 'disabled');
    if (different < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
 
  refs.daysInfo.textContent = days;
  refs.hoursInfo.textContent = hours;
  refs.minutesInfo.textContent = minutes;
  refs.secondsInfo.textContent = seconds;
    
  addLeadingZero(refs.daysInfo.textContent);
  addLeadingZero(refs.hoursInfo.textContent);
  addLeadingZero(refs.minutesInfo.textContent);
  addLeadingZero(refs.secondsInfo.textContent);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}