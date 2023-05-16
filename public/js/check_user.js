let check_user = false;
let sign_in = document.querySelector('.sign-in');
let sign_in_mobile = document.querySelector('.sign-in-mobile');
let menu_desktop = document.querySelector('.menu-desktop');
let burger_container_on = document.querySelector('.burger-content');
if (localStorage.getItem('check_user')!= undefined) {
  check_user = JSON.parse(localStorage.getItem('check_user'));
}




if(check_user) {
    
    menu_desktop.insertAdjacentHTML(`beforeend`, 
    `<div class="sign_out_block">
        <a href="#" class="sign_out">Выйти</a>
        <img class="avatar" src="../img/avatar.webp" alt = "иконка аккаунта">
    </div>`
    )
    burger_container_on.insertAdjacentHTML(`beforeend`, 
    `<div class="sign_out_block">
        <a href="#" class="sign_out">Выйти</a>
        <img class="avatar" src="../img/avatar.webp" alt = "иконка аккаунта">
    </div>`
    )
    sign_in_mobile.style.display = "none";
    sign_in.style.display = "none";
}
let sign_out = document.querySelector('.sign_out');

let sign_out_block = document.querySelector('.sign_out_block');
if(sign_out != null) {
    sign_out.addEventListener("click", () => {
        check_user = false;
        sign_in.style.display = "block"
        document.querySelector('.sign_out_block').style.display = "none"
        localStorage.setItem('check_user', check_user.toString());
        location.reload();
    })
    sign_out_block.addEventListener("touchstart", () => {
        check_user = false;
        sign_in.style.display = "block"
        document.querySelector('.sign_out_block').style.display = "none"
        localStorage.setItem('check_user', check_user.toString());
        location.reload();
    })
}

if(!check_user) {
    sign_in.style.display = "block";

    document.querySelector('.booking-menu').href = "#";
    let modal = document.querySelector('.modal');
    document.querySelector('.booking-menu').onclick = () => {
        modal.className = 'modal error';
        document.querySelector('.error').innerHTML = '<p>Вы не вошли в аккаунт&#10062;</p>' 
        document.querySelector('.error').style.animation = "anim_error 1.5s";
        setTimeout(() => {
            modal.style.animation = "";
        }, 2000); 
    }  
     
}