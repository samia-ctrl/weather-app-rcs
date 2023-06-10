let currentDay = document.querySelector("li.current-day");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

currentDay.innerHTML = `${day} ${now.getHours()}:${now.getMinutes()}`;
let currentDate = document.querySelector("span.current-date");
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
currentDate.innerHTML = `${date} ${month} ${year}`;

function displayForecast() {
  forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
                  <div><i class="fa-solid fa-cloud-sun"></i></div>
                  ${day}
                  <div class="forecast"> <span class ="weather-forecast-max">13°C</span> / <span class ="weather-forecast-max">3°C</span></div>
                </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getWeather(response) {
  let curTemp = document.querySelector(".big-temp");
  let temperature = Math.round(`${response.data.main.temp}`);
  let curDesc = document.querySelector(".description-today");
  let showCity = document.querySelector(".city-display");
  let todayIcon = document.querySelector("#current-icon");
  curTemp.innerHTML = `${temperature}`;
  curDesc.innerHTML = `${response.data.weather[0].description}`;
  showCity.innerHTML = `${response.data.name}`;
  console.log(todayIcon);
  todayIcon.innerHTML = `<img src=
    "https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png">`;

  celTemp = response.data.main.temp;
}

function defCity(city) {
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-tab").value;
  defCity(city);
}
let form = document.querySelector(".search-input");
form.addEventListener("submit", searchCity);

function displayFahrConversion(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".big-temp");
  let fTemperature = (celTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fTemperature);
}

let celTemp = null;

let fLink = document.querySelector(".fTemp");
fLink.addEventListener("click", displayFahrConversion);

function celConversion(event) {
  event.preventDefault();
  let tempElement = document.querySelector(".big-temp");
  tempElement.innerHTML = Math.round(celTemp);
}

let cLink = document.querySelector(".cTemp");
cLink.addEventListener("click", celConversion);

defCity("London");
displayForecast();
