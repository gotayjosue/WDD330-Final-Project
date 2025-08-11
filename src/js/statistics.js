import { switchCurrencies, loadCoins, getDateRange, fetchDataAndPlot } from "./utils.mjs";
const year = new Date().getFullYear();
const yearElement = document.querySelector('#current-year');

yearElement.textContent = year; // Set the current year in the footer

const select1 = document.querySelector('#from-chart');
const select2 = document.querySelector('#to-chart');
const rangeSelect = document.querySelector('#range');
const ctx = document.querySelector('#price-chart').getContext('2d');
//API key and URL for exchange rates
const apiKey = 'f6575c00e8159e80d3a297d4';
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/codes`;


// Toggle hamburger menu
const menuButton = document.querySelector('#menuButton')
const navBar = document.querySelector('#navigation')
const switchButton = document.querySelector('#change-icon')

menuButton.addEventListener('click', () =>{

    navBar.classList.toggle('open')
    menuButton.classList.toggle('open')
})


// Change the icon when the menu is open or closed
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1000) { //Everytime the page gets bigger the class 'open' will be take out of the navBar and the menuButton//
        navBar.classList.remove('open');
        menuButton.classList.remove('open')
        switchButton.style.transform = 'rotate(180deg)';
    }
    else {
        switchButton.style.transform = 'rotate(90deg)';
    }
});


// Switch currencies when the switch button is clicked
switchButton.addEventListener('click', () => {
  switchCurrencies(select1, select2);

  switchButton.classList.add('rotate'); // Add a class to rotate the icon

  setTimeout(() => {
    switchButton.classList.remove('rotate'); // Remove the class after a short delay
  }, 500);
});

// Load the coins into the select elements
loadCoins(url, select1, select2);

// Get the date range based on the selected option
getDateRange(rangeSelect.value);

// Fetch data and plot the chart
fetchDataAndPlot(select1, select2, rangeSelect, ctx);

//Listeners
[select1, select2, rangeSelect].forEach((element) => {
  element.addEventListener('change', () => {
    fetchDataAndPlot(select1, select2, rangeSelect, ctx);
  });
});

loadCoins(url, select1, select2).then(() => {
  fetchDataAndPlot(select1, select2, rangeSelect, ctx);
});
