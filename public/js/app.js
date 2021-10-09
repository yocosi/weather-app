console.log("Client side JS file is loaded!");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#first-message');
const msgTwo = document.querySelector('#second-message');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the page to reload after submiting

  const location = search.value;

  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msgOne.textContent = data.error;
      } else {
        msgOne.textContent = data.location;
        msgTwo.textContent = data.forecast;
      }
    })
  })
})