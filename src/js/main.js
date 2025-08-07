import { convertCoins, loadCoins, switchCurrencies } from './utils.mjs';

// Toggle hamburger menu
const menuButton = document.querySelector('#menuButton')
const navBar = document.querySelector('#navigation')
const changeButton = document.querySelector('#change-icon')
const year = new Date().getFullYear();
const yearElement = document.querySelector('#current-year');

yearElement.textContent = year; // Set the current year in the footer

// Add event listener to the menu button to toggle the navigation bar

menuButton.addEventListener('click', () =>{

    navBar.classList.toggle('open')
    menuButton.classList.toggle('open')
})

// Change the icon when the menu is open or closed
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


//Inserting data from the API into the select elements
const apiKey = 'f6575c00e8159e80d3a297d4';
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/codes`;
const select1 = document.querySelector('#from-currency');
const select2 = document.querySelector('#to-currency');
const amountInput = document.querySelector('#amount');
const resultText = document.querySelector('#result');
const convertButton = document.querySelector('#convert-button');
const switchButton = document.querySelector('#change-icon');

// Load coins into the select elements
loadCoins(url, select1, select2);

// Convert coins when the convert button is clicked
convertButton.addEventListener('click', () => {
  convertCoins(apiKey, select1, select2, amountInput, resultText);
});

// Switch currencies when the switch button is clicked
switchButton.addEventListener('click', () => {
  switchCurrencies(select1, select2);

  switchButton.classList.add('rotate'); // Add a class to rotate the icon

  setTimeout(() => {
    switchButton.classList.remove('rotate'); // Remove the class after a short delay
  }, 500);
});


