const form = document.querySelector(".search_form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");
const date = new Date().toDateString();

async function getWeather(city) {
  weather.innerHTML = `<h2> Loading... <h2>`;
  const apiKey = `74a6fefa0dcbb7a4e32f96a38748468c`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  return showWeather(data);
}

const showWeather = (data) => {
  if (data.cod == "404") {
    weather.innerHTML = `<h2> City Not Found <h2>`;
    return;
  }
  weather.innerHTML = `
        <div class="data">
        <h2>${data.name}</h2>
        <h3>${date}</h3>
        <div class="clouds">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="img" />
            <div>
            <h2>${data.main.temp} ℃ </h2>
            <h3>${data.weather[0].main}</h3>
            </div>
        </div>
        <div class="info">
          <div class="col">
            <h4>Wind</h4>
            <h5>${data.wind.speed} km/h</h5>
          </div>
          <div class="col">
            <h4>Humidity</h4>
            <h5>${data.main.humidity} %</h5>
          </div>
          <div class="col">
            <h4>Air Pressure</h4>
            <h5>${data.main.pressure} hPa</h5>
          </div>
        </div>
      </div>
    `;
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const city = search.value;
  if (city !== "") {
    getWeather(city);
  }
  search.value = "";
});
