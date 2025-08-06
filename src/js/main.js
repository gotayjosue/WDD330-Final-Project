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

