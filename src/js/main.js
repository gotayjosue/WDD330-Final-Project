import { loadCoins } from './utils.mjs';
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

// Fetch exchange rates from an API

const apiKey = 'f6575c00e8159e80d3a297d4';
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/codes`;
const select1 = document.querySelector('#from-currency');
const select2 = document.querySelector('#to-currency');



loadCoins(url, select1, select2);