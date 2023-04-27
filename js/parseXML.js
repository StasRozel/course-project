let table = (arr_tag, arr) => {
  let i = 0;
  for (const elem_arr of arr_tag) {
      arr[i++] = elem_arr.textContent;
  }
  return arr;
}

fetch('../xml/train_schedule.xml')
  .then(res => res.text())
  .then(xmlString => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const ways = xmlDoc.getElementsByTagName('way');
    const times = xmlDoc.getElementsByTagName('time');
    const train_imgs = xmlDoc.getElementsByTagName('trainImg');

    let ways_arr = [], times_arr = [], train_imgs_arr = [];
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

  // 