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
      let str_way;
      let date_value = document.querySelector('.input_date').value;
      let where_from = document.querySelector('.input_where_from').value;
      let where_to = document.querySelector('.input_where_to').value;
      times_arr.forEach((element, index) => {
        str_way = ways_arr[index].split(' ');
        if(element != date_value && str_way[2] != where_to && where_from != "") {
          
          document.querySelectorAll('.rows')[index].style.display = 'none';
        }
      })
    };

  }

  parseXML();