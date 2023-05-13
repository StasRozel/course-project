let burgerMenu = document.querySelector('.burger-menu');
let burgerContainer = document.querySelector('.burger-container-off');
let line = document.querySelectorAll('.line');
let counter = 0;
burgerMenu.onclick = () => {
    counter++;
    if(counter % 2) {
        burgerContainer.className = "burger-content burger-container-on";
        
        line.forEach((el, i) => {
            el.className = "line open-" +(i + 1);
        })
    } else if (!(counter % 2)) {
        burgerContainer.className = "burger-content burger-container-off";
        line.forEach((el, i) => {
            el.className = "line close-" + (i + 1);
        })
    }
}
