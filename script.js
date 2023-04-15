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
    (new Intl.DateTimeFormat("ar-TN-u-ca-islamic", {
      day: "numeric",
    }).format(Date.now()) -
      1) +
    " " +
    new Intl.DateTimeFormat("ar-TN-u-ca-islamic", {
      month: "long",
    }).format(Date.now());
}, 1000);

getWeatherData(21.2703, 40.4158, "الطائف");
getWeatherData(21.4267, 39.8261, "مكة المكرمة");
getWeatherData(21.5169, 39.2192, "جدة");

setTimeout(() => {
  document.location.reload();
}, 1800000);

function getWeatherData(latitude, longitude, city_name) {
  arr = [];
  arrCityName = [];
  fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (arr.length >= 3) {
        arr = [];
        arrCityName = [];
      }
      arr.push(data);
      arrCityName.push(city_name);
    });
}
prayer_time();

function prayer_time() {
  fetch(
    "http://api.aladhan.com/v1/timingsByCity?city=Makkah&country=Saudi Arabia&method=4"
  )
    .then((response) => response.json())
    .then((prayers) => {
      setInterval(() => {
        const time = new Date();
        hours = time.getHours() > 9 ? time.getHours() : "0" + time.getHours();
        minutes =
          time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes();
        second =
          time.getSeconds() > 9 ? time.getSeconds() : "0" + time.getSeconds();
        timeNow = hours + ":" + minutes + ":" + second; // HH:MM:SS
        if (prayers.data.timings.Fajr + ":00" == timeNow || prayers.data.timings.Dhuhr + ":00" == timeNow || prayers.data.timings.Asr + ":00" == timeNow || prayers.data.timings.Maghrib + ":00" == timeNow || prayers.data.timings.Isha + ":00" == timeNow) {
          var audio = new Audio("aa.mp3");
          audio.play();
        }
        if (prayers.data.timings.Fajr > timeNow) {
          document.getElementById("prayer-now").innerHTML = `
        <div class="prayer-next">الصلاة التالية</div>
        <div class="prayer-name">الفجر</div>
        <div class="to-prayer">${calculateTimeLeft(
          timeNow,
          prayers.data.timings.Fajr + ":00"
        )}</div>
        <div class="time-prayer">${tConvert(prayers.data.timings.Fajr)}</div>
        `;
          document.getElementById("prayer-now").style.backgroundImage =
            "url(images/fajr.png)";
        } else if (prayers.data.timings.Sunrise > timeNow) {
          document.getElementById("prayer-now").innerHTML = `
        <div class="prayer-next">الصلاة التالية</div>
        <div class="prayer-name">الشروق</div>
        <div class="to-prayer">${calculateTimeLeft(
          timeNow,
          prayers.data.timings.Sunrise + ":00"
        )}</div>
        <div class="time-prayer">${tConvert(prayers.data.timings.Sunrise)}</div>
        `;
          document.getElementById("prayer-now").style.backgroundImage =
            "url(images/fajr.png)";
        } else if (prayers.data.timings.Dhuhr > timeNow) {
          document.getElementById("prayer-now").innerHTML = `
        <div class="prayer-next">الصلاة التالية</div>
        <div class="prayer-name">الظهر</div>
        <div class="to-prayer">${calculateTimeLeft(
          timeNow,
          prayers.data.timings.Dhuhr + ":00"
        )}</div>
        <div class="time-prayer">${tConvert(prayers.data.timings.Dhuhr)}</div>
        `;
          document.getElementById("prayer-now").style.backgroundImage =
            "url(images/dhuhr.png)";
        } else if (prayers.data.timings.Asr > timeNow) {
          document.getElementById("prayer-now").innerHTML = `
        <div class="prayer-next">الصلاة التالية</div>
        <div class="prayer-name">العصر</div>
        <div class="to-prayer">${calculateTimeLeft(
          timeNow,
          prayers.data.timings.Asr + ":00"
        )}</div>
        <div class="time-prayer">${tConvert(prayers.data.timings.Asr)}</div>
        `;
          document.getElementById("prayer-now").style.backgroundImage =
            "url(images/asr.png)";

          document.getElementById("prayer-now").style.backgroundImage =
            "url(images/isha.png)";
        } else if (prayers.data.timings.Maghrib > timeNow) {
          document.getElementById("prayer-now").innerHTML = `
        <div class="prayer-next">الصلاة التالية</div>
        <div class="prayer-name">المغرب</div>
        <div class="to-prayer">${calculateTimeLeft(
          timeNow,
          prayers.data.timings.Maghrib + ":00"
        )}</div>
        <div class="time-prayer">${tConvert(prayers.data.timings.Maghrib)}</div>
        `;
          document.getElementById("prayer-now").style.backgroundImage =
            "url(images/maghrib.png)";
        } else if (prayers.data.timings.Isha > timeNow) {
          document.getElementById("prayer-now").innerHTML = `
        <div class="prayer-next">الصلاة التالية</div>
        <div class="prayer-name">العشاء</div>
        <div class="to-prayer">${calculateTimeLeft(
          timeNow,
          prayers.data.timings.Isha + ":00"
        )}</div>
        <div class="time-prayer">${tConvert(prayers.data.timings.Isha)}</div>
        `;
          document.getElementById("prayer-now").style.backgroundImage =
            "url(images/isha.png)";
        } else if (prayers.data.timings.Isha < timeNow) {
          document.getElementById("prayer-now").innerHTML = `
        <div class="prayer-next">الصلاة التالية</div>
        <div class="prayer-name">الفجر</div>
        <div class="time-prayer" style="color: green;
        font-size: 35px;">${tConvert(prayers.data.timings.Fajr)}</div>
        `;
          document.getElementById("prayer-now").style.backgroundImage =
            "url(images/fajr.png)";
        }
      }, 1000);
    });
}

// convert time from 24 to 12
function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " ص" : " م"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
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
  let { temp, humidity, pressure, sunrise, sunset, wind_speed } = data.current;

  timezone.innerHTML = city_name;
  countryEl.innerHTML = data.lat + "N " + data.lon + "E";

  currentWeatherItemsEl.innerHTML = `
  <div class="weather-item">
        <div>درجة الحرارة</div>
        <div>${temp}&#176;C</div>
  </div>
  <div class="weather-item">
        <div>الرطوبة</div>
        <div>${humidity} ٪</div>
  </div>
  <div class="weather-item">
        <div>الضغط الجوي</div>
        <div>${pressure}hPa</div>
  </div>
  <div class="weather-item">
        <div>سرعة الرياح</div>
        <div>${wind_speed}m/s</div>
  </div>
  <div class="weather-item">
        <div>شروق الشمس</div>
        <div>${tConvert(window.moment(sunrise * 1000).format("HH:mm"))}</div>
  </div>
  <div class="weather-item">
        <div>غروب الشمس</div>
        <div>${tConvert(window.moment(sunset * 1000).format("HH:mm"))}</div>

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

function calculateTimeLeft(start, end) {
  var startTime = new Date();
  var endTime = new Date();
  var diff;

  // تحديد وقت البدء
  var [startHour, startMinute, startSecond] = start.split(":");
  startTime.setHours(startHour);
  startTime.setMinutes(startMinute);
  startTime.setSeconds(startSecond);

  // تحديد وقت النهاية
  var [endHour, endMinute, endSecond] = end.split(":");
  endTime.setHours(endHour);
  endTime.setMinutes(endMinute);
  endTime.setSeconds(endSecond);

  // حساب الفرق بالثواني
  diff = (endTime - startTime) / 1000;

  // تحويل الفرق إلى ساعات ودقائق وثواني
  var hours = Math.floor(diff / 3600);
  var minutes = Math.floor((diff % 3600) / 60);
  var seconds = Math.floor(diff % 60);

  // إضافة الصفر الأمامي للرقم إذا كان أقل من 10
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}
