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

function getWeather(response) {
  let curTemp = document.querySelector(".big-temp");
  let temperature = Math.round(`${response.data.main.temp}`);
  curTemp.innerHTML = `${temperature}`;
  let curDesc = document.querySelector(".description-today");
  console.log(response.data.weather[0].description);
  curDesc.innerHTML = `${response.data.weather[0].description}`;
  let showCity = document.querySelector(".city-display");
  showCity.innerHTML = `${response.data.name}`;
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

function showTemp(response) {
  let locationTemp = document.querySelector(".big-temp");
  let posTemp = Math.round(`${response.data.main.temp}`);
  locationTemp.innerHTML = `${posTemp}`;
  let location = document.querySelector(".city-display");
  location.innerHTML = `${response.data.name}`;
  let localDesc = document.querySelector(".description-today");
  localDesc.innerHTML = `${response.data.weather[0].description}`;
}
defCity("London");
