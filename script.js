const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");

const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");

const days = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

const API_KEY = "98ef5999d1586618fe031176d346fc4f";
setInterval(() => {
  const time = new Date();
  new Intl.DateTimeFormat("ar-TN-u-ca-islamic", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  }).format(Date.now());
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "مساءاً" : "صباحاً";

  timeEl.innerHTML =
    (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    `<span id="am-pm">${ampm}</span>`;
  dateEl.innerHTML =
    days[day] +
    "," +
    " " +
    new Intl.DateTimeFormat("ar-TN-u-ca-islamic", {
      day: "numeric",
      month: "long",
    }).format(Date.now());
}, 1000);

getWeatherData(21.2703, 40.4158, "الطائف");
getWeatherData(21.4267, 39.8261, "مكة المكرمة");
getWeatherData(21.5169, 39.2192, "جدة");

setTimeout(() => {
  document.location.reload();
}, 3600000);

// setInterval(() => {
//   location.reload();
// }, 30000);

function getWeatherData(latitude, longitude, city_name) {
  arr = [];
  arrCityName = []
  fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (arr.length >= 3) {
        arr = [];
        arrCityName = []
      }
      arr.push(data);
      arrCityName.push(city_name);
    });
}

n = 0;
setInterval(() => {
  if (n == 0) {
    showWeatherData(arr[0], arrCityName[0]);
    n++;
  } else if (n == 1) {
    showWeatherData(arr[1], arrCityName[1]);
    n++;
  } else {
    showWeatherData(arr[2], arrCityName[2]);
    n = 0;
  }
}, 10000);

function showWeatherData(data, city_name) {
  let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

  timezone.innerHTML = city_name;
  countryEl.innerHTML = data.lat + "N " + data.lon + "E";

  currentWeatherItemsEl.innerHTML = `<div class="weather-item">
        <div>الرطوبة</div>
        <div>${humidity} ٪</div>
  </div>
  <div class="weather-item">
        <div>الضغط الجوي</div>
        <div>${pressure}hPa</div>
  </div>
  <div class="weather-item">
        <div>سرعة الرياح</div>
        <div>${wind_speed}km/h</div>
  </div>
  <div class="weather-item">
        <div>شروق الشمس</div>
        <div>${window.moment(sunrise * 1000).format("HH:mm صباحاً")}</div>
  </div>
  <div class="weather-item">
        <div>غروب الشمس</div>
        <div>${window.moment(sunset * 1000).format("HH:mm مساءاً")}</div>

  </div>
  
  `;
  let otherDayForcast = "";
  data.daily.forEach((day, idx) => {
    if (idx == 0) {
      currentTempEl.innerHTML = `
        <img
          src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
          alt="weather icon"
          class="w-icon"
        />
        <div class="other">
          <div class="day">${convertDay(
            window.moment(day.dt * 1000).format("ddd")
          )}</div>
          <div class="temp"> ${day.temp.night}&#176;C</div>
          <div class="temp">${day.temp.day}&#176;C</div>
        </div>
        `;
    } else {
      otherDayForcast += `
        <div class="weather-forecast-item">
          <div class="day">${convertDay(
            window.moment(day.dt * 1000).format("ddd")
          )}</div>
          <img
            src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
            alt="weather icon"
            class="w-icon"
          />
          <div class="temp">${day.temp.night}&#176;C</div>
          <div class="temp">${day.temp.day}&#176;C</div>
        </div>
        `;
      weatherForecastEl.innerHTML = otherDayForcast;
    }
  });
}
console.log(
  new Intl.DateTimeFormat("ar-TN-u-ca-islamic", {
    day: "numeric",
    month: "long",
  }).format(Date.now())
);

function convertDay(day) {
  if (day == "Fri") {
    return "الجمعة";
  } else if (day == "Sat") {
    return "السبت";
  } else if (day == "Sun") {
    return "الأحد";
  } else if (day == "Mon") {
    return "الإثنين";
  } else if (day == "Tue") {
    return "الثلاثاء";
  } else if (day == "Wed") {
    return "الأربعاء";
  } else {
    return "الخميس";
  }
}
