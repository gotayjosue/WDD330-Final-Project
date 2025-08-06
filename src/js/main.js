// Toggle hamburger menu
const menuButton = document.querySelector('#menuButton')
const navBar = document.querySelector('#navigation')
const changeButton = document.querySelector('#change-icon')

menuButton.addEventListener('click', () =>{

    navBar.classList.toggle('open')
    menuButton.classList.toggle('open')
})


window.addEventListener('resize', () => {
    if (window.innerWidth >= 1000) { //Everytime the page gets bigger the class 'open' will be take out of the navBar and the menuButton//
        navBar.classList.remove('open');
        menuButton.classList.remove('open')
        changeButton.style.transform = 'rotate(180deg)';
    }
    else {
        changeButton.style.transform = 'rotate(90deg)';
    }
});

// Fetch exchange rates from an API

const apiKey = 'YOUR_API_KEY';
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Handle your exchange rate data here
  })
  .catch(error => {
    console.error('Error fetching exchange rates:', error);
  });
