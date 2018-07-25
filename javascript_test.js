const fetch = require('node-fetch');


async function getUE() {
  await fetch('http://assistantutt.ga:8080/get/UE?code=MATH01')
    .then(info => info.json())
    .then(info => console.log(info[0].code));
}

getUE();
