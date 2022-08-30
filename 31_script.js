// function UpdateTemperapureC(event) {
//   event.preventDefault();
//   CurrentTemperature.innerHTML = `${temperapureC}°C`;
// }
// function UpdateTemperapureF(event) {
//   event.preventDefault();
//   CurrentTemperature.innerHTML = `${temperatureF}°C`;
// }

function showTemperature(response) {
  let temperapureC = `${Math.round(response.data.main.temp)}`;
  let temperatureF = Math.round(temperapureC * 1.8 + 32);
  let CurrentTemperature = document.querySelector(".today-temperature");
  CurrentTemperature.innerHTML = `${temperapureC}°C`;
  //   let UpdateCelcius = document.querySelector("#celsius");
  //   UpdateCelcius.addEventListener("click", UpdateTemperapureC);
  //   let UpdateFahrenheit = document.querySelector("#fahrenheit");
  //   UpdateFahrenheit.addEventListener("click", UpdateTemperapureF);
}

function search(city) {
  document.querySelector("#currentCity").innerHTML = city;
  let apiKey = "697a37f1b088537cbe4399bcf02a85a4";
  let unit = "metric";
  let APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(APIurl).then(showTemperature);
}

function UpdateMainDisplay(event) {
  event.preventDefault();
  let inputSearch = document.querySelector("#input-search");
  let city = document.querySelector("#currentCity");
  city = inputSearch.value;
  city.innerHTML = inputSearch.value;
  search(city);
}

function showTemperatureCurrentLocation(response) {
  console.log(response);
  let temperatureC = Math.round(response.data.main.temp);
  console.log(temperatureC);
  let temperatureF = Math.round(temperatureC * 1.8 + 32);
  let CurrentTemperature = document.querySelector(".today-temperature");
  CurrentTemperature.innerHTML = `${temperatureC}°C`;
  let location = response.data.name;
  let city = document.querySelector("#currentCity");
  city.innerHTML = location;
  //   let UpdateCelcius = document.querySelector("#celsius");
  //   UpdateCelcius.addEventListener("click", UpdateTemperapureC);
  //   let UpdateFahrenheit = document.querySelector("#fahrenheit");
  //   UpdateFahrenheit.addEventListener("click", UpdateTemperapureF);
}

function UpdateLocationDisplay(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat, lon);
  let apiKey = "697a37f1b088537cbe4399bcf02a85a4";
  let unit = "metric";
  let APIurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(APIurl).then(showTemperatureCurrentLocation);
}

function UpdateNavigation(event) {
  event.preventDefault();
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

search("New York");

let Today = document.querySelector(".today-day");
Today.innerHTML = formatDate();

let updateForm = document.querySelector(".CurrentSearch");
updateForm.addEventListener("submit", UpdateMainDisplay);

let updateClocation = document.querySelector("#current-button");
updateClocation.addEventListener("click", UpdateNavigation);
