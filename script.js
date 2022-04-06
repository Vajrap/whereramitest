'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies);
  const html = `
  <article class="country ${className}">
<img class="country__img" src="${data.flags.png}" />
<div class="country__data">
  <h3 class="country__name">${data.name.common}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
    1
  )}M people</p>
  <p class="country__row"><span>🗣️</span>${languages}</p>
  <p class="country__row"><span>💰</span>${currencies[0].name}</p>
</div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.getElementsByClassName.opacity = 1;
};

let curCity, curCountry, countryUse;

///////////////////////////////////////

//Get Position for Where Am I
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err)
    );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

//fnc async/await
const whereAmI = async function () {
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;
  console.log(lat, lng);
  const data = await fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=218563543476776421031x2922`
  );
  const dataJson = await data.json();
  curCity = dataJson.city;
  curCountry = dataJson.country;
  countryUse = curCountry.toString().toLowerCase();
  console.log(curCity, curCountry, countryUse);
  console.log(dataJson);

  // await for cnt_data
  const cntData = await fetch(
    `https://restcountries.com/v3.1/name/${countryUse}`
  );
  const cntDataJson = await cntData.json();
  console.log(cntDataJson);
  renderCountry(cntDataJson[0]);
};

btn.addEventListener('click', function () {
  whereAmI();
});
