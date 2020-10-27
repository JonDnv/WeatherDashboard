var searchListEl = document.querySelector("searchList");
var searchBarEl = document.querySelector("citySearch");
var todaysWeatherApiStart = "http://api.openweathermap.org/data/2.5/weather?q=";
var oneCallApiStart = "https://api.openweathermap.org/data/2.5/onecall?lat=";
var oneCallApi2 = "&lon=";
var oneCallApi3 = "&units=imperial";
var oneCallApi4 = "&exclude=minutely,hourly,alerts";
var weatherApiEnd = "&appid=d825b4839db3c20535f069ecf1ad48bd";
var weatherIconUrlStart = "http://openweathermap.org/img/wn/";
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

    // Only Working For 1st Button
    $("#newCity").click(function () {
      console.log($(this).text());
    });
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
            weatherReturn.uvIndex = oneCallData.current.uvi;

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
              weatherIconUrlStart + oneCallData.daily[1].weather[0].icon;
            forcastReturn.day1 = day1;

            day2.forcastDate = toLocalDate(oneCallData.daily[2].dt);
            day2.low = oneCallData.daily[2].temp.min;
            day2.high = oneCallData.daily[2].temp.max;
            day2.humidity = oneCallData.daily[2].humidity;
            day2.icon =
              weatherIconUrlStart + oneCallData.daily[2].weather[0].icon;
            forcastReturn.day2 = day2;

            day3.forcastDate = toLocalDate(oneCallData.daily[3].dt);
            day3.low = oneCallData.daily[3].temp.min;
            day3.high = oneCallData.daily[3].temp.max;
            day3.humidity = oneCallData.daily[3].humidity;
            day3.icon =
              weatherIconUrlStart + oneCallData.daily[3].weather[0].icon;
            forcastReturn.day3 = day3;

            day4.forcastDate = toLocalDate(oneCallData.daily[4].dt);
            day4.low = oneCallData.daily[4].temp.min;
            day4.high = oneCallData.daily[4].temp.max;
            day4.humidity = oneCallData.daily[4].humidity;
            day4.icon =
              weatherIconUrlStart + oneCallData.daily[4].weather[0].icon;
            forcastReturn.day4 = day4;

            day5.forcastDate = toLocalDate(oneCallData.daily[5].dt);
            day5.low = oneCallData.daily[5].temp.min;
            day5.high = oneCallData.daily[5].temp.max;
            day5.humidity = oneCallData.daily[5].humidity;
            day5.icon =
              weatherIconUrlStart + oneCallData.daily[5].weather[0].icon;
            forcastReturn.day5 = day5;
          });

        weatherReturn.cityName = todaysWeather.name;
        weatherReturn.currentDate = toLocalDate(todaysWeather.dt);
        weatherReturn.currentTemp = todaysWeather.main.temp;
        weatherReturn.currentHumidity = todaysWeather.main.humidity;
        weatherReturn.currentWindSpeed = todaysWeather.wind.speed;
        weatherReturn.currentIcon =
          weatherIconUrlStart + todaysWeather.weather[0].icon;
      });
  }

  function displayResults() {
    
      
  }

  // $(".main").empty();
  // var div1 = $("<div>");
  // div1.attr("id", "currentDate");
  // var cityDate = $("<h3>");
  // cityDate.text(cityName + " (" + currentDate + ")");
  // div1.append(cityDate);
  // $(".main").append(div1);

  // $(".main").empty();
  // var d1 = $("<div>");
  // d1.attr("id", "oneday");
  // d1.attr("class", "");
  // var uv = $("<p>");
  // var temp = $("<p>");
  // temp.text("TEMP: " + oneCall.main.temp);

  // d1.append(temp);
  // d1.append(uv);
  // $(".main").append(d1);

  $(".searchButton").on("click", function () {
    addSearchList(document.getElementById("citySearch").value);
    oneCall(document.getElementById("citySearch").value);
    setInterval(function () {
      displayResults();
    }, 2000);
    displaySearchList(searchList);
    clearSearchBar();
  });

  $("#citySearch").keypress(function (e) {
    if (e.which === 13) {
      addSearchList(document.getElementById("citySearch").value);
      oneCall(document.getElementById("citySearch").value);
      displayResults();
      displaySearchList(searchList);
      clearSearchBar();
    }
  });
});
