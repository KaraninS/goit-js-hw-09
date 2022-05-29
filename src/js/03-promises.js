import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const firstDelay = document.querySelector('input[name=delay]');
const delayStep = document.querySelector('input[name=step]');
const amount = document.querySelector('input[name=amount]');

form.addEventListener('submit', promiseFunction);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({
          position: position,
          delay: delay,
        });
      } else {
        reject({
          position: position,
          delay: delay,
        });
      }
    }, delay);
  });
}

function promiseFunction(event) {
  event.preventDefault();
  let firstDelayNumber = Number(firstDelay.value);
  for (let i = 0; i < amount.value; i += 1) {
    createPromise(i, firstDelayNumber)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstDelayNumber += Number(delayStep.value);
  }
}