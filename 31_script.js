function updateImage(weatherMain) {
  if (weatherMain === "Thunderstorm") {
    return "12_img/thunderstorm.svg";
  } else if (weatherMain === "Drizzle") {
    return "12_img/Drizzle-rain.svg";
  } else if (weatherMain === "Rain") {
    // atualizar depois
    return "12_img/Drizzle-rain.svg";
  } else if (weatherMain === "Snow") {
    return "12_img/snow1.svg";
  } else if (weatherMain === "Atmosphere") {
    return "12_img/fog1.svg";
  } else if (weatherMain === "Clear") {
    return "12_img/clear1.svg";
  } else if (weatherMain === "Clouds") {
    // atualizar
    return "12_img/clouds2.svg";
  }
}

function showTemperature(response) {
  console.log(response);
  temperapureC = `${Math.round(response.data.main.temp)}`;
  CurrentTemperature.innerHTML = `${temperapureC}°C`;
  let location = response.data.name;
  console.log(location);
  document.querySelector("#currentCity").innerHTML = `${location}`;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}`;
  let weatherStatus = document.querySelector("#weather-status");
  weatherStatus.innerHTML = `${response.data.weather[0].description}`;
  weatherStatus = response.data.weather[0].description;
  console.log(weatherStatus);
  let iconElement = document.querySelector(".icon_today");
  console.log(iconElement);
  let weatherMain = response.data.weather[0].main;
  let weatherId = response.data.weather[0].id;
  console.log(weatherId);
  if (
    weatherId === 500 ||
    weatherId === 501 ||
    weatherId === 502 ||
    weatherId === 503 ||
    weatherId === 504
  ) {
    iconElement.setAttribute("src", "12_img/rain1.svg");
  } else if (weatherId === 511) {
    iconElement.setAttribute("src", "12_img/snow1.svg");
  } else if (weatherId === 801) {
    iconElement.setAttribute("src", "12_img/clouds1.svg");
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
    iconElement.setAttribute("src", "12_img/fog1.svg");
  } else {
    iconElement.setAttribute("src", updateImage(weatherMain));
  }
  iconElement.setAttribute("alt", weatherStatus);
}

function search(city) {
  let apiKey = "697a37f1b088537cbe4399bcf02a85a4";
  let unit = "metric";
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
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "697a37f1b088537cbe4399bcf02a85a4";
  let unit = "metric";
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
}
function UpdateTemperapureF(event) {
  event.preventDefault();
  let temperatureF = Math.round(temperapureC * 1.8 + 32);
  CurrentTemperature.innerHTML = `${temperatureF}°F`;
}

let temperapureC = null;
let CurrentTemperature = document.querySelector(".today-temperature");
let city = document.querySelector("#currentCity");

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
