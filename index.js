function formatDate(date) {
  let thisHour = date.getHours();
  if (thisHour < 10) {
    thisHour = `0${thisHour}`;
  }

  let thisMinute = date.getMinutes();
  if (thisMinute < 10) {
    thisMinute = `0${thisMinute}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayIndex = date.getDay();
  let today = days[dayIndex];

  return `${today} ${thisHour}:${thisMinute}`;
}

let p = document.querySelector("#date");
let currentTime = new Date();
p.innerHTML = formatDate(currentTime);

function convertToFahrenheit() {}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function locate(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityElement = document.querySelector("#show-city");
  cityElement.innerHTML = `${searchInput.value}`;
  searchCity(searchInput.value);
}

let form = document.querySelector("#city");
form.addEventListener("submit", locate);

function showTemp(response) {
  console.log(response.data);
}

function searchCity(city) {
  let apiKey = "9ee8642695c7bb9e77c98b6a3388381c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getCurrentCity);
}

function handlePosition(position) {
  let apiKey = "9ee8642695c7bb9e77c98b6a3388381c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getCurrentCity);
}

function find(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function getCurrentCity(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#show-city");
  cityElement.innerHTML = response.data.name;

  let tempElement = document.querySelector("#now-temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);
}

let currentLocation = document.querySelector("#localWeather");
currentLocation.addEventListener("click", find);
