let burgerMenu = document.querySelector('.burger-menu');
let burgerContainer = document.querySelector('.burger-container');
let line = document.querySelectorAll('.line');
let counter = 0;
burgerMenu.onclick = () => {
    counter++;
    if(counter % 2) {
        burgerContainer.style.display = "block"
        line.forEach((el, i) => {
            el.className = "line-" +(i + 1);
        })
    } else if (!(counter % 2)) {
        burgerContainer.style.display = "none"
        line.forEach(el => {
            el.className = "line";
        })
    }
}