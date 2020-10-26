var searchListEl = document.querySelector("searchList");
var searchBarEl = document.querySelector("citySearch");
var todaysWeatherApiStart = "http://api.openweathermap.org/data/2.5/weather?q=";
var day5WeatherApiStart = "http://api.openweathermap.org/data/2.5/forecast?q=";
var uvIndexApiStart = "http://api.openweathermap.org/data/2.5/uvi?lat=";
var uvIndexApiMiddle = "&lon=";
var WeatherApiEnd = "&appid=d825b4839db3c20535f069ecf1ad48bd";
var lat;
var lon;

var searchList = [];
if (JSON.parse(localStorage.getItem("searchCities") !== null)) {
  searchList = JSON.parse(localStorage.getItem("searchCities"));
}

function addSearchList() {
  var searchBarText = document.getElementById("citySearch").value;
  if (searchBarText !== "") {
    searchList.push(searchBarText);
    localStorage.setItem("searchCities", JSON.stringify(searchList));
  }
}

function clearSearchBar() {
  document.getElementById("citySearch").value = "";
}

function displaySearchList() {
  for (var i = 0; i < searchList.length; i++) {
    var newCity = $('<button type="button" id="newCity"></button>').text(
      searchList[i]
    );
    $(".searchList").prepend(newCity);
  }
}

function addSearchListItem() {
  var newCityText = document.getElementById("citySearch").value;
  if (newCityText !== "") {
    var newCity = $('<button type="button" id="newCity"></button>').text(
      newCityText
    );
    $(".searchList").prepend(newCity);
  }
}

function todaysWeather() {
  var weatherCity = document.getElementById("citySearch").value;
  if (weatherCity !== "") {
    var todaysWeatherUrl = todaysWeatherApiStart + weatherCity + WeatherApiEnd;
  }
  fetch(weatherCity)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lat = data.coord.lat;
      lon = data.coord.lon;
      console.log(lat);
      console.log(lon);
    });
}

$(".searchButton").on("click", function () {
  addSearchList();
  addSearchListItem();
  todaysWeather();
  clearSearchBar();
});

$("#citySearch").keypress(function (e) {
  if (e.which === 13) {
    addSearchList();
    addSearchListItem();
    todaysWeather();
    clearSearchBar();
  }
});

$(document).ready(function () {
  displaySearchList();
});
