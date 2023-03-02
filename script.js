function updateImage(weatherMain) {
  if (weatherMain === "Thunderstorm") {
    return "img/thunderstorm.svg";
  } else if (weatherMain === "Drizzle") {
    return "img/Drizzle-rain.svg";
  } else if (weatherMain === "Rain") {
    return "img/Drizzle-rain.svg";
  } else if (weatherMain === "Snow") {
    return "img/snow1.svg";
  } else if (weatherMain === "Atmosphere") {
    return "img/fog1.svg";
  } else if (weatherMain === "Clear") {
    return "img/clear1.svg";
  } else if (weatherMain === "Clouds") {
    return "img/clouds2.svg";
  }
}

function forecastImage(forecastDay) {
  let weatherMain = forecastDay.weather[0].main;
  let weatherId = forecastDay.weather[0].id;
  if (
    weatherId === 500 ||
    weatherId === 501 ||
    weatherId === 502 ||
    weatherId === 503 ||
    weatherId === 504
  ) {
    return "img/rain1.svg";
  } else if (weatherId === 511) {
    return "img/snow1.svg";
  } else if (
    weatherId === 701 ||
    weatherId === 711 ||
    weatherId === 721 ||
    weatherId === 731 ||
    weatherId === 741 ||
    weatherId === 751 ||
    weatherId === 761 ||
    weatherId === 762 ||
    weatherId === 771 ||
    weatherId === 781
  ) {
    return "img/fog1.svg";
  } else if (weatherId === 801) {
    return "img/clouds1.svg";
  } else {
    return updateImage(weatherMain);
  }
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForescast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row row-cols-md-5 g-0">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col">
            <div class="card text-center">
              <div class="card-body">
                  <p class="card-text">${formatDay(forecastDay.dt)}</p>
                  <img
                  src="${forecastImage(forecastDay)}"
                  alt="${forecastDay.weather[0].description}"
                  class="forecastWeather"
                  width="70%"
                  />
                  <hr />
                  <div class="card-text weather-forecast-temp">
                    <span class="weather-forecast-tempC-max">${Math.round(
                      forecastDay.temp.max
                    )}</span></span class="forecast-unit">${unitTemp}</span>
                    <span class="weather-forecast-tempC-min"> | ${Math.round(
                      forecastDay.temp.min
                    )}</span></span class="forecast-unit">${unitTemp}</span>
                  </div>
              </div>
            </div>
          </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForescast() {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let APIurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(APIurl).then(displayForescast);
}

function showTemperature(response) {
  temperapureC = `${Math.round(response.data.main.temp)}`;
  CurrentTemperature.innerHTML = `${temperapureC}°C`;
  let location = response.data.name;
  document.querySelector("#currentCity").innerHTML = `${location}`;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;
  feelsLikeC = Math.round(response.data.main.feels_like);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}`;
  let weatherStatus = document.querySelector("#weather-status");
  weatherStatus.innerHTML = `${response.data.weather[0].description}`;
  weatherStatus = response.data.weather[0].description;
  let iconElement = document.querySelector(".icon_today");
  let weatherData = response.data;

  iconElement.setAttribute("src", forecastImage(weatherData));
  iconElement.setAttribute("alt", weatherStatus);

  lat = response.data.coord.lat;
  lon = response.data.coord.lon;

  getForescast();
}

function search(city) {
  unit = "metric";
  unitTemp = "°C";
  let apiKey = "697a37f1b088537cbe4399bcf02a85a4";
  let APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(APIurl).then(showTemperature);
}

function UpdateMainDisplay(event) {
  event.preventDefault();
  let inputSearch = document.querySelector("#input-search");
  searchCity = inputSearch.value;
  search(searchCity);
}

function UpdateLocationDisplay(position) {
  unitTemp = "°C";
  unit = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "697a37f1b088537cbe4399bcf02a85a4";
  let APIurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(APIurl).then(showTemperature);
}

function UpdateNavigation(event) {
  event.preventDefault();
  city = "";
  navigator.geolocation.getCurrentPosition(UpdateLocationDisplay);
}

function formatDate() {
  let now = new Date();
  let currentDate = now.getDate();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weekDay = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "March",
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
  let currenMonth = months[now.getMonth()];
  let Hour = now.getHours();
  if (Hour < 10) {
    Hour = "0" + Hour;
  }
  let Minutes = now.getMinutes();
  if (Minutes < 10) {
    Minutes = "0" + Minutes;
  }
  return `${weekDay}, ${currentDate} ${currenMonth} ${Hour}:${Minutes}`;
}

function UpdateTemperapureC(event) {
  event.preventDefault();
  CurrentTemperature.innerHTML = `${temperapureC}°C`;
  feelsLike.innerHTML = `${feelsLikeC}°C`;
  unit = "metric";
  unitTemp = "°C";
  getForescast();
}
function UpdateTemperapureF(event) {
  event.preventDefault();
  let temperatureF = Math.round(temperapureC * 1.8 + 32);
  let feelsLikeF = Math.round(feelsLikeC * 1.8 + 32);
  CurrentTemperature.innerHTML = `${temperatureF}°F`;
  feelsLike.innerHTML = `${feelsLikeF}°F`;
  unit = "imperial";
  unitTemp = "°F";
  getForescast();
}

let temperapureC = null;
let feelsLikeC = null;
let lat = null;
let lon = null;
let unit = "metric";
let unitTemp = "°C";
let CurrentTemperature = document.querySelector(".today-temperature");
let city = document.querySelector("#currentCity");
let feelsLike = document.querySelector("#feels-like");

search("New York");

let Today = document.querySelector(".today-day");
Today.innerHTML = formatDate();

let updateForm = document.querySelector(".CurrentSearch");
updateForm.addEventListener("submit", UpdateMainDisplay);

let updateClocation = document.querySelector("#current-button");
updateClocation.addEventListener("click", UpdateNavigation);

let UpdateCelcius = document.querySelector("#celsius");
UpdateCelcius.addEventListener("click", UpdateTemperapureC);
let UpdateFahrenheit = document.querySelector("#fahrenheit");
UpdateFahrenheit.addEventListener("click", UpdateTemperapureF);
