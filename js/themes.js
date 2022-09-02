const themeSwitcher = document.querySelector('.calc__toggle');
const toggle = document.querySelectorAll('.calc__numbers');
const rootCSS = document.querySelector(':root');
const body = document.querySelector('body');

// Theme switcher 
toggle.forEach((item) => {
    item.addEventListener('click', () => {
        if(item.classList.contains('calc__1') && !themeSwitcher.classList.contains('theme-one')) {
            rootCSS.style.setProperty('--switch-toggle', 'translatex(0)');
            themeSwitcher.classList.add('theme-one')
            themeSwitcher.classList.remove('theme-two');
            themeSwitcher.classList.remove('theme-three');
            body.classList.remove('theme-two');
            body.classList.remove('theme-three');
            
            localStorage.clear();
        }

        if(item.classList.contains('calc__2') && !themeSwitcher.classList.contains('theme-two')) {
            rootCSS.style.setProperty('--switch-toggle', 'translatex(1.37rem)');
            themeSwitcher.classList.remove('theme-one');
            themeSwitcher.classList.add('theme-two');
            themeSwitcher.classList.remove('theme-three');
            body.classList.add('theme-two');
            body.classList.remove('theme-three');

            localStorage.setItem('Theme two', 'theme-two');
            localStorage.removeItem('Theme three');
        }

        if(item.classList.contains('calc__3') && !themeSwitcher.classList.contains('theme-three')) {
            rootCSS.style.setProperty('--switch-toggle', 'translatex(2.81rem)');
            themeSwitcher.classList.remove('theme-one');
            themeSwitcher.classList.remove('theme-two');
            themeSwitcher.classList.add('theme-three');
            body.classList.remove('theme-two');
            body.classList.add('theme-three');

            localStorage.setItem('Theme three', 'theme-three');
            localStorage.removeItem('Theme two');
        }

    })
})

// Local storage for the themes
document.addEventListener('DOMContentLoaded', () => {
    let themeTwo = localStorage.getItem('Theme two');
    let themeThree = localStorage.getItem('Theme three');

    if(themeTwo) {
        body.className += themeTwo;
        themeSwitcher.className += themeTwo;
        rootCSS.style.setProperty('--switch-toggle', 'translatex(1.37rem)');
    }

    if(themeThree) {
        body.className += themeThree;
        themeSwitcher.className += themeThree;
        rootCSS.style.setProperty('--switch-toggle', 'translatex(2.81rem)');
    }
})