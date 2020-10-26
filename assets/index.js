var searchListEl = document.querySelector("searchList");
var searchBarEl = document.querySelector("citySearch");
var todaysWeatherApiStart = "http://api.openweathermap.org/data/2.5/weather?q=";
var oneCallApiStart = "https://api.openweathermap.org/data/2.5/onecall?lat=";
var oneCallApi2 = "&lon=";
var oneCallApi3 = "&units=imperial";
var oneCallApi4 = "&exclude=minutely,hourly,alerts";
var weatherApiEnd = "&appid=d825b4839db3c20535f069ecf1ad48bd";
var weatherIconUrlStart = "http://openweathermap.org/img/wn/";

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
    new Date(unixTime).toLocaleDateString("en-US");
  }

  function oneCall(city) {
    var todayUrl = todaysWeatherApiStart + city + oneCallApi3 + weatherApiEnd;
    fetch(todayUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (todaysWeather) {
        // console.log(todaysWeather);
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
            // console.log(oneCallData);
          });

        var cityName = todaysWeather.name;
        var currentDate = toLocalDate(todaysWeather.dt);
        var currentTemp = todaysWeather.main.temp;
        var currentHumidity = todaysWeather.main.humidity;
        var currentWindSpeed = todaysWeather.wind.speed;
        var currentIcon = weatherIconUrlStart + todaysWeather.weather[0].icon;
        var currentUV = oneCallData.current.uvi;

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
});
