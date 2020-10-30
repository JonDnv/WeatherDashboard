var searchListEl = document.querySelector("searchList");
var searchBarEl = document.querySelector("citySearch");
var todaysWeatherApiStart = "http://api.openweathermap.org/data/2.5/weather?q=";
var oneCallApiStart = "https://api.openweathermap.org/data/2.5/onecall?lat=";
var oneCallApi2 = "&lon=";
var oneCallApi3 = "&units=imperial";
var oneCallApi4 = "&exclude=minutely,hourly,alerts";
var weatherApiEnd = "&appid=d825b4839db3c20535f069ecf1ad48bd";
var weatherIconUrlStart = "http://openweathermap.org/img/wn/";
var weatherIconUrlEnd = "@2x.png";
var weatherReturn = {};
var forcastReturn = {};

var searchList = [];
if (JSON.parse(localStorage.getItem("searchCities") !== null)) {
  searchList = JSON.parse(localStorage.getItem("searchCities"));
}

$(document).ready(function () {
  displaySearchList(searchList);

  function displaySearchList(searchListArray) {
    $(".searchList").empty();
    for (var i = 0; i < searchListArray.length; i++) {
      var newCity = $('<button type="button" id="newCity"></button>').text(
        searchListArray[i]
      );
      $(".searchList").prepend(newCity);
    }
  }

  function addSearchList(searchBarText) {
    if (searchBarText !== "") {
      searchList.push(searchBarText);
      localStorage.setItem("searchCities", JSON.stringify(searchList));
    }
  }

  function clearSearchBar() {
    document.getElementById("citySearch").value = "";
  }

  function toLocalDate(unixTime) {
    var unixDate = new Date(unixTime * 1000);
    return unixDate.toLocaleDateString("en-US");
  }

  function oneCall(city) {
    var todayUrl = todaysWeatherApiStart + city + oneCallApi3 + weatherApiEnd;
    fetch(todayUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (todaysWeather) {
        //console.log(todaysWeather);
        var oneCallUrl =
          oneCallApiStart +
          todaysWeather.coord.lat +
          oneCallApi2 +
          todaysWeather.coord.lon +
          oneCallApi3 +
          oneCallApi4 +
          weatherApiEnd;

        fetch(oneCallUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (oneCallData) {
            //console.log(oneCallData);
            var uvIndex = oneCallData.current.uvi;

            var day1 = {};
            var day2 = {};
            var day3 = {};
            var day4 = {};
            var day5 = {};

            day1.forcastDate = toLocalDate(oneCallData.daily[1].dt);
            day1.low = oneCallData.daily[1].temp.min;
            day1.high = oneCallData.daily[1].temp.max;
            day1.humidity = oneCallData.daily[1].humidity;
            day1.icon =
              weatherIconUrlStart +
              oneCallData.daily[1].weather[0].icon +
              weatherIconUrlEnd;
            forcastReturn.day1 = day1;

            day2.forcastDate = toLocalDate(oneCallData.daily[2].dt);
            day2.low = oneCallData.daily[2].temp.min;
            day2.high = oneCallData.daily[2].temp.max;
            day2.humidity = oneCallData.daily[2].humidity;
            day2.icon =
              weatherIconUrlStart +
              oneCallData.daily[2].weather[0].icon +
              weatherIconUrlEnd;
            forcastReturn.day2 = day2;

            day3.forcastDate = toLocalDate(oneCallData.daily[3].dt);
            day3.low = oneCallData.daily[3].temp.min;
            day3.high = oneCallData.daily[3].temp.max;
            day3.humidity = oneCallData.daily[3].humidity;
            day3.icon =
              weatherIconUrlStart +
              oneCallData.daily[3].weather[0].icon +
              weatherIconUrlEnd;
            forcastReturn.day3 = day3;

            day4.forcastDate = toLocalDate(oneCallData.daily[4].dt);
            day4.low = oneCallData.daily[4].temp.min;
            day4.high = oneCallData.daily[4].temp.max;
            day4.humidity = oneCallData.daily[4].humidity;
            day4.icon =
              weatherIconUrlStart +
              oneCallData.daily[4].weather[0].icon +
              weatherIconUrlEnd;
            forcastReturn.day4 = day4;

            day5.forcastDate = toLocalDate(oneCallData.daily[5].dt);
            day5.low = oneCallData.daily[5].temp.min;
            day5.high = oneCallData.daily[5].temp.max;
            day5.humidity = oneCallData.daily[5].humidity;
            day5.icon =
              weatherIconUrlStart +
              oneCallData.daily[5].weather[0].icon +
              weatherIconUrlEnd;
            forcastReturn.day5 = day5;

            $(".currentWeather").append(
              '<div class="currentUv currWeather"><h6>UV Index: <span id="uvBox">' +
                uvIndex +
                "</span></h6></div>"
            );

            var uvBox = document.querySelector("#uvBox");

            if (parseInt(uvIndex) <= 2) {
              uvBox.classList.add("badge", "badge-success");
            } else if (parseInt(uvIndex) > 2 && parseInt(uvIndex) <= 5) {
              uvBox.classList.add("badge", "badge-warning");
            } else {
              uvBox.classList.add("badge", "badge-danger");
            }

            $(".forcastWeather").empty();
            $(".forcastWeather").append('<div class="title"></div>');
            $(".forcastWeather").append(
              '<div class="card day1 forWeather"></div>'
            );

            $(".forcastWeather").append(
              '<div class="card day2 forWeather"></div>'
            );
            $(".forcastWeather").append(
              '<div class="card day3 forWeather"></div>'
            );
            $(".forcastWeather").append(
              '<div class="card day4 forWeather"></div>'
            );
            $(".forcastWeather").append(
              '<div class="card day5 forWeather"></div>'
            );

            var forcastTitle = $("<h3>");
            forcastTitle.text("5-Day Forecast");
            $(".title").append(forcastTitle);

            //Day 1
            var day1Date = $('<h6 class="card-title day1Title">');
            day1Date.text(forcastReturn.day1.forcastDate);
            $(".day1").append(day1Date);

            var day1Img = $('<img id="day1Icon">');
            $(".day1").append(day1Img);
            $("#day1Icon").attr("src", forcastReturn.day1.icon);

            var day1Return = $("<h6 class=card-body day1Forcast>");
            day1Return.text(
              "Low Temp: " +
                forcastReturn.day1.low +
                "\nHigh Temp: " +
                forcastReturn.day1.high +
                "\nHumidity: " +
                forcastReturn.day1.humidity
            );
            day1Return.html(day1Return.html().replace(/\n/g, "<br/>"));
            $(".day1").append(day1Return);

            //Day 2
            var day2Date = $('<h6 class="card-title day2Title">');
            day2Date.text(forcastReturn.day2.forcastDate);
            $(".day2").append(day2Date);

            var day2Img = $('<img id="day2Icon">');
            $(".day2").append(day2Img);
            $("#day2Icon").attr("src", forcastReturn.day2.icon);

            var day2Return = $("<h6 class=card-body day2Forcast>");
            day2Return.text(
              "Low Temp: " +
                forcastReturn.day2.low +
                "\nHigh Temp: " +
                forcastReturn.day2.high +
                "\nHumidity: " +
                forcastReturn.day2.humidity
            );
            day2Return.html(day2Return.html().replace(/\n/g, "<br/>"));
            $(".day2").append(day2Return);

            //Day 3
            var day3Date = $('<h6 class="card-title day3Title">');
            day3Date.text(forcastReturn.day3.forcastDate);
            $(".day3").append(day3Date);

            var day3Img = $('<img id="day3Icon">');
            $(".day3").append(day3Img);
            $("#day3Icon").attr("src", forcastReturn.day3.icon);

            var day3Return = $("<h6 class=card-body day3Forcast>");
            day3Return.text(
              "Low Temp: " +
                forcastReturn.day3.low +
                "\nHigh Temp: " +
                forcastReturn.day3.high +
                "\nHumidity: " +
                forcastReturn.day3.humidity
            );
            day3Return.html(day3Return.html().replace(/\n/g, "<br/>"));
            $(".day3").append(day3Return);

            //Day 4
            var day4Date = $('<h6 class="card-title day4Title">');
            day4Date.text(forcastReturn.day4.forcastDate);
            $(".day4").append(day4Date);

            var day4Img = $('<img id="day4Icon">');
            $(".day4").append(day4Img);
            $("#day4Icon").attr("src", forcastReturn.day4.icon);

            var day4Return = $("<h6 class=card-body day4Forcast>");
            day4Return.text(
              "Low Temp: " +
                forcastReturn.day4.low +
                "\nHigh Temp: " +
                forcastReturn.day4.high +
                "\nHumidity: " +
                forcastReturn.day4.humidity
            );
            day4Return.html(day4Return.html().replace(/\n/g, "<br/>"));
            $(".day4").append(day4Return);

            //Day 5
            var day5Date = $('<h6 class="card-title day5Title">');
            day5Date.text(forcastReturn.day5.forcastDate);
            $(".day5").append(day5Date);

            var day5Img = $('<img id="day5Icon">');
            $(".day5").append(day5Img);
            $("#day5Icon").attr("src", forcastReturn.day5.icon);

            var day5Return = $("<h6 class=card-body day5Forcast>");
            day5Return.text(
              "Low Temp: " +
                forcastReturn.day5.low +
                "\nHigh Temp: " +
                forcastReturn.day5.high +
                "\nHumidity: " +
                forcastReturn.day5.humidity
            );
            day5Return.html(day5Return.html().replace(/\n/g, "<br/>"));
            $(".day5").append(day5Return);
          });

        weatherReturn.cityName = todaysWeather.name;
        weatherReturn.currentDate = toLocalDate(todaysWeather.dt);
        weatherReturn.currentTemp = todaysWeather.main.temp;
        weatherReturn.currentHumidity = todaysWeather.main.humidity;
        weatherReturn.currentWindSpeed = todaysWeather.wind.speed;
        weatherReturn.currentIcon =
          weatherIconUrlStart +
          todaysWeather.weather[0].icon +
          weatherIconUrlEnd;

        $(".currentWeather").empty();
        $(".currentWeather").addClass("currentWeatherBox");
        $(".currentWeather").append('<div class="cityDiv currWeather"></div>');
        $(".currentWeather").append(
          '<div class="currentTempDiv currWeather"></div>'
        );
        $(".currentWeather").append(
          '<div class="currentHumidityDiv currWeather"></div>'
        );
        $(".currentWeather").append(
          '<div class="currWindSpeed currWeather"></div>'
        );

        var cityIcon = $("<img>");
        cityIcon.attr("src", weatherReturn.currentIcon);
        var cityDate = $("<h3>");
        cityDate.text(
          weatherReturn.cityName + " (" + weatherReturn.currentDate + ")"
        );
        cityDate.append(cityIcon);
        $(".cityDiv").append(cityDate);

        var currTemp = $("<h6>");
        currTemp.text("Temperature: " + weatherReturn.currentTemp + "ºF");
        $(".currentTempDiv").append(currTemp);

        var currHum = $("<h6>");
        currHum.text("Humidity: " + weatherReturn.currentTemp + "%");
        $(".currentHumidityDiv").append(currHum);

        var currWind = $("<h6>");
        currWind.text("Wind Speed: " + weatherReturn.currentWindSpeed + " MPH");
        $(".currWindSpeed").append(currWind);
      });
  }

  $(".searchButton").on("click", function () {
    addSearchList(document.getElementById("citySearch").value);
    oneCall(document.getElementById("citySearch").value);
    displaySearchList(searchList);
    clearSearchBar();
  });

  $("#citySearch").keypress(function (e) {
    if (e.which === 13) {
      addSearchList(document.getElementById("citySearch").value);
      oneCall(document.getElementById("citySearch").value);
      displaySearchList(searchList);
      clearSearchBar();
    }
  });

  // Only Working For 1st Button
  $("#newCity").on("click", function () {
    console.log($(this).text());
  });
});
