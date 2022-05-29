function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  body:document.querySelector('body'),
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
}

let cnangeColor = null;
refs.buttonStop.setAttribute('disabled', 'disabled')
refs.buttonStart.addEventListener('click', addChangeColor)
refs.buttonStop.addEventListener('click', addStopChangeColor)

function addChangeColor() {
   cnangeColor = setInterval(() => {
       refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  refs.buttonStart.setAttribute('disabled', 'disabled')
  refs.buttonStop.removeAttribute("disabled","disabled")
};

function addStopChangeColor() {
  clearInterval(cnangeColor);
    refs.buttonStart.removeAttribute('disabled', 'disabled')
    refs.buttonStop.setAttribute("disabled","disabled")
};