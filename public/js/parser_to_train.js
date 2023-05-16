let table = (arr_tag, arr) => {
  let i = 0;
  for (const elem_arr of arr_tag) {
      arr[i++] = elem_arr.textContent;
  }
  return arr;
}
let ways_arr = [], times_arr = [], train_imgs_arr = [];
let parser = (xmlString => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const ways = xmlDoc.getElementsByTagName('way');
    const times = xmlDoc.getElementsByTagName('time');
    const train_imgs = xmlDoc.getElementsByTagName('trainImg');

    
    ways_arr = table(ways, ways_arr);
    times_arr = table(times, times_arr);
    train_imgs_arr = table(train_imgs, train_imgs_arr);

    for (let i = 0; i < ways_arr.length; i++) {
     
      document.querySelector('.table').insertAdjacentHTML("beforeend",

            `<div class="rows">
                <p class="time">${times_arr[i]}</p>
                <img class="trainImg" src="${train_imgs_arr[i]}">
                <p class="way">${ways_arr[i]}</p>
            </div>`

      );
    }
  })

  async function parseXML() {
    
    let a = await fetch('/xml/train_schedule.xml');
    let xmlString = await a.text();
    parser(xmlString);

    document.querySelector('.button_booking').onclick = () => {
      let str_way, flag = true;
      let where_from = document.querySelector('.input_where_from').value;
      let where_to = document.querySelector('.input_where_to').value;
      times_arr.forEach((element, index) => {
        str_way = ways_arr[index].split(' ');
        if(str_way[2] != where_to || str_way[0] != where_from) {
          
          document.querySelectorAll('.rows')[index].style.display = 'none';
        } else {
          document.querySelectorAll('.rows')[index].style.display = 'grid';
          flag = false;
        }
      })
      if (flag) {
        document.querySelector('.table').innerHTML = `
        <p class='error_message'>Данного маршрута нет</p>
        <button class = "open_list">Открыть весь список<button>
        `;
      }

      document.querySelector('.open_list').onclick = () => {
        parser(xmlString);
        document.querySelector('.error_message').style.display ="none";
        document.querySelector('.open_list').style.display ="none";
      }
    };

  }

  parseXML();
