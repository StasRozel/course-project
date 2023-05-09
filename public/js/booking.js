let table = (arr_tag, arr) => {
  let i = 0;
  for (const elem_arr of arr_tag) {
    arr[i++] = elem_arr.textContent;
  }
  return arr;
}
let ways_arr = [], times_arr = [], train_imgs_arr = [], price_arr = [];
let parser = (xmlString => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  const ways = xmlDoc.getElementsByTagName('way');
  const times = xmlDoc.getElementsByTagName('time');
  const train_imgs = xmlDoc.getElementsByTagName('trainImg');
  const prices = xmlDoc.getElementsByTagName('price');

  ways_arr = table(ways, ways_arr);
  times_arr = table(times, times_arr);
  train_imgs_arr = table(train_imgs, train_imgs_arr);
  price_arr = table(prices, price_arr);
})

async function parseXML() {
  let a = await fetch('/xml/train_schedule.xml');
  let xmlString = await a.text();
  parser(xmlString);
  let price, flag_list = false;
  document.querySelector('.button_search').onclick = () => {
    let where_from = document.querySelector('.input_where_from').value;
    let where_to = document.querySelector('.input_where_to').value;
    times_arr.forEach((element, index) => {
      let str_way = ways_arr[index].split(' ');
      if (str_way[2] == where_to && where_from == str_way[0]) {
        document.querySelector('.wrapper').style.height = "55%";
        document.querySelector('.input_date').style.display = "block";
        document.querySelector('.number_passangers').style.display = "block";
        document.querySelector('.summa').style.display = "block";
        document.querySelector('.button_booking').style.display = "block";
        price = Number(price_arr[index]);
        document.querySelector('.summa').innerHTML = `Cумма билета: ${price} руб`;
      }
    })
  }
  let number_passangers = document.querySelector('.number_passangers');
  number_passangers.onchange = () => {

    for (let i = 0; i <= 6; i++) {
      if (number_passangers.value == i) {

        let price_two = price + (i * 1.2);
        document.querySelector('.summa').innerHTML = `Cумма билета: ${price_two} руб`;
        flag_list = true;  

      }


    }


  }

  document.querySelector('.button_booking').onclick = () => {
    let flag = true;
    let str_way;
    let date_value = document.querySelector('.input_date').value;
    let where_from = document.querySelector('.input_where_from').value;
    let where_to = document.querySelector('.input_where_to').value;
    let modal = document.querySelector('.modal');

    times_arr.forEach((element, index) => {
      str_way = ways_arr[index].split(' ');
      if (element == date_value && str_way[2] == where_to && where_from == str_way[0] && flag_list) {


        modal.className = 'modal in_account';
        document.querySelector('.in_account').innerHTML = '<p>Вы забронировали место&#9989;</p>'
        document.querySelector('.in_account').style.animation = "anim 2s";

        setTimeout(() => {
          modal.style.animation = "";
        }, 2000);

        flag = false;
      }


    })
    if (flag) {
      modal.className = 'modal error';
      document.querySelector('.error').innerHTML = '<p>Данный маршрут не найден&#10062;</p>'
      document.querySelector('.error').style.animation = "anim_error 1.5s";

      setTimeout(() => {
        document.querySelector('.error').style.animation = "";
      }, 1500);
    }
  };

}

parseXML();
