let weather = {
  apiKey: "493add9ac9c1331a10e9ac8df72bb4ef",
  latKey: "abb6bcc9f2859851ea07ef2aac0f43b0",

  //Clean Code - used the localStorage.setItem to set the return of the city to local storage to call later
  //was able to remove an entire duplicate fuction, now only have displayWeather instead of that plus another one for the city

  fetchWeather: function (city) {
      console.log(city);
    if (!isNaN(city)) {
      fetch(
        "https://api.openweathermap.org/geo/1.0/zip?zip=" +
          city +
          "&appid=" +
          this.apiKey
      )
        .then((response) => response.json())
        .then((location) => {
          console.log(location);
          let lat = location.lat;
          let long = location.lon;
          localStorage.setItem("cityName", location.name);
          console.log(lat);
          console.log(long);

          return fetch(
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
              lat +
              "&lon=" +
              long +
              "&exclude=minutelyhourlyalerts&units=imperial&appid=" +
              this.apiKey
          )
            .then((response) => response.json())
            .then((data) => this.displayWeather(location, data));
        });
    } else {
      fetch(
        "https://api.openweathermap.org/geo/1.0/direct?q=" +
          city + ",usa" +
          "&appid=" +
          this.apiKey
      )
        .then((response) => response.json())
        .then((location) => {
          console.log(location);
          let lat = location[0].lat;
          let long = location[0].lon;
          localStorage.setItem("cityName", location[0].name);
          console.log(lat);
          console.log(long);

          return fetch(
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
              lat +
              "&lon=" +
              long +
              "&exclude=minutelyhourlyalerts&units=imperial&appid=" +
              this.apiKey
          )
            .then((response) => response.json())
            .then((data) => this.displayWeather(location, data));
        });
    }
  },

  fetchMetric: function (city) {
    if (!isNaN(city)) {
        fetch(
          "https://api.openweathermap.org/geo/1.0/zip?zip=" +
            city +
            "&appid=" +
            this.apiKey
        )
          .then((response) => response.json())
          .then((location) => {
            console.log(location);
            let lat = location.lat;
            let long = location.lon;
            localStorage.setItem("cityName", location.name);
            console.log(lat);
            console.log(long);
  
            return fetch(
              "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                lat +
                "&lon=" +
                long +
                "&exclude=minutelyhourlyalerts&units=metric&appid=" +
                this.apiKey
            )
              .then((response) => response.json())
              .then((data) => this.displayWeather(location, data));
          });
      } else {
        fetch(
          "https://api.openweathermap.org/geo/1.0/direct?q=" +
            city + ",usa" +
            "&appid=" +
            this.apiKey
        )
          .then((response) => response.json())
          .then((location) => {
            console.log(location);
            let lat = location[0].lat;
            let long = location[0].lon;
            localStorage.setItem("cityName", location[0].name);
            console.log(lat);
            console.log(long);
  
            return fetch(
              "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                lat +
                "&lon=" +
                long +
                "&exclude=minutelyhourlyalerts&units=metric&appid=" +
                this.apiKey
            )
              .then((response) => response.json())
              .then((data) => this.displayWeather(location, data));
          });
      }
  },
//Zip function
  displayWeather: function (location, data) {
    console.log(data);
    console.log(location);
    let nameCity = localStorage.getItem("cityName");
    console.log(nameCity);
    const { icon, description } = data.current.weather[0];
    const { temp, feels_like, humidity } = data.current;
    const { min, max } = data.daily[0].temp;
    const { wind_speed } = data.current;
    const today = new Date().getDay();
    var day = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    console.log(nameCity, icon, description, temp, humidity, wind_speed);
    document.querySelector(".city").innerText = "Weather in " + nameCity;
    document.querySelector(".date").innerText = "For your " + weekday[today];
    document.querySelector(".icon").src =
      "http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = Math.round(temp) + "??";
    document.querySelector(".feels").innerText =
      "Feels like " + Math.round(feels_like) + "??";
    document.querySelector(".highlo").innerText =
      Math.round(min) + "?? / " + Math.round(max) + "??";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + Math.round(wind_speed) + " mph";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/random/2000??2000/?," +
      description +
      " )";

    console.log(weekday[today]);
    function extended() {
      //Extended days
      console.log(data.daily[0].temp.max);
      let desc1 = data.daily[1].weather[0].description;
      let icon1 = data.daily[1].weather[0].icon;
      let desc2 = data.daily[2].weather[0].description;
      let icon2 = data.daily[2].weather[0].icon;
      let desc3 = data.daily[3].weather[0].description;
      let icon3 = data.daily[3].weather[0].icon;
      let tempMax1 = data.daily[1].temp.max;
      let tempMax2 = data.daily[2].temp.max;
      let tempMax3 = data.daily[3].temp.max;
      let tempMin1 = data.daily[1].temp.min;
      let tempMin2 = data.daily[2].temp.min;
      let tempMin3 = data.daily[3].temp.min;
      document.querySelector(".img1").src =
        "http://openweathermap.org/img/wn/" + icon1 + ".png";
      document.querySelector(".d1con").innerText = desc1;
      document.querySelector(".d1hi").innerText =
        Math.round(tempMin1) + "??/" + Math.round(tempMax1) + "??";
      document.querySelector(".img2").src =
        "http://openweathermap.org/img/wn/" + icon2 + ".png";
      document.querySelector(".d2con").innerText = desc2;
      document.querySelector(".d2hi").innerText =
        Math.round(tempMin2) + "??/" + Math.round(tempMax2) + "??";
      document.querySelector(".img3").src =
        "http://openweathermap.org/img/wn/" + icon3 + ".png";
      document.querySelector(".d3con").innerText = desc3;
      document.querySelector(".d3hi").innerText =
        Math.round(tempMin3) + "??/" + Math.round(tempMax3) + "??";

      var date = new Date();
      var tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      var twoDays = new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000);
      var threeDays = new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000);

      document.querySelector(".d1").innerHTML = weekday[tomorrow.getDay()];
      document.querySelector(".d2").innerHTML = weekday[twoDays.getDay()];
      document.querySelector(".d3").innerHTML = weekday[threeDays.getDay()];
    }
    extended();
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },

  searchMetric: function () {
    this.fetchMetric(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
    
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

document.querySelector(".toggle").addEventListener("click", function () {
  if (document.querySelector(".search-bar").value === "") {
    weather.fetchMetric("28227");
  } else {
    weather.searchMetric();
  }
});

weather.fetchWeather("28227");
