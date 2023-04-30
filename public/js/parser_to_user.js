let table = (arr_tag, arr) => {
  let i = 0;
  for (const elem_arr of arr_tag) {
    arr[i++] = elem_arr.textContent;
  }
  return arr;
}

async function parseUsersXML() {
  let a = await fetch('/xml/users.xml');
  let xmlString = await a.text();
  let input_password = document.querySelector('.input_password');
  let input_login = document.querySelector('.input_login');

  let checkForm = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const logins = xmlDoc.getElementsByTagName('login');
    const passwords = xmlDoc.getElementsByTagName('password');

    let logins_arr = [], password_arr = [];
    
    logins_arr = table(logins, logins_arr);
    password_arr = table(passwords, password_arr);

    document.querySelector('.button_log_in').onclick = () => {
      let flag = true;
      let modal = document.querySelector('.modal');
      for (let i = 0; i < logins_arr.length; i++) {
        if (input_login.value == logins_arr[i] &&
          input_password.value == password_arr[i]) {
          modal.className = 'modal in_account';
          document.querySelector('.in_account').innerHTML = '<p>Вы успешно вошли в аккаунт&#9989;</p>' 
          document.querySelector('.in_account').style.animation = "anim 2s";

          setTimeout(() => {
            modal.style.animation = "";
          }, 2000);
          
          flag = false;

          input_login.value = "";
          input_password.value = "";
        } 
      }

      if (flag) {
        modal.className = 'modal error';
        document.querySelector('.error').innerHTML = '<p>Не верно введен логин или пароль&#10062;</p>' 
        document.querySelector('.error').style.animation = "anim_error 1.5s";

          setTimeout(() => {
            document.querySelector('.error').style.animation = "";
          }, 1500);
      }

      
    }
  }

  checkForm(xmlString);
}
parseUsersXML();