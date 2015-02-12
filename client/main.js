'use strict';

$(document).ready(clickNsa);

// function init() {
//   // $('#get-weather').click(clickGetCams);
//   // $('#nsa').click(clickNsa);
// }

function clickNsa() {
  var options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
  navigator.geolocation.getCurrentPosition(success, error, options)
}

function success(pos) {
  var urlInfo = 'http://api.wunderground.com/api/5ac2a3bc4dece267/forecast10day/q/' + pos.coords.latitude +',' +   pos.coords.longitude + '.json';
  var urlCond = 'http://api.wunderground.com/api/5ac2a3bc4dece267/conditions/q/' + pos.coords.latitude +',' +   pos.coords.longitude + '.json';
  var urlCity = 'http://api.wunderground.com/api/5ac2a3bc4dece267/geolookup/q/' + pos.coords.latitude +',' +   pos.coords.longitude + '.json';
  getForecastData(urlInfo);
  getCondData(urlCond);
  getCityData(urlCity);
}

function error(err) {
  console.log('could not find your position', err)
}

// function clickGetCams() {
//   var zipCode = $('#zip-code').val();
//   var url = 'http://api.wunderground.com/api/5ac2a3bc4dece267/forecast10day/q/' + zipCode + '.json';
// }

function getForecastData(urlInfo) {
  var dates = [];
  var dayShorts = [];
  var tempsHighF = [];
  var tempsLowF = [];
  var conds = [];
  var icons = [];
  var conditions = [];
  var monthShort = [];

  $.getJSON(urlInfo, function(response) {
    response.forecast.simpleforecast.forecastday.forEach(function(a){
      console.log(response.forecast.simpleforecast.forecastday)
      dates.push(a['date']['day']);
      dayShorts.push(a['date']['weekday']);
      tempsHighF.push(a['high']['fahrenheit']);
      tempsLowF.push(a['low']['fahrenheit']);
      conds.push(a['conditions']);
      icons.push(a['icon_url']);
      conditions.push(a['conditions']);
      monthShort.push(a['date']['monthname_short']);
    })
    addForecastData(dates, dayShorts, tempsHighF, tempsLowF, conds, icons, conditions);
    })
}

function getCondData(urlCond){

  var feelsLike = "";
  $.getJSON(urlCond, function(response) {
    feelsLike = response.current_observation['feelslike_f'];
    addCondData(feelsLike);
  })
}

function getCityData(urlCity){
var city = ""
  $.getJSON(urlCity, function(response) {
    city = response.location['city'];
    addCityData(city);
  })
}

function addForecastData(dates, dayShorts, tempsHighF, tempsLowF, conds, icons, conditions){
  var count = 1;
  for(var i = 0; i < 11; i++){
    $('#day' + count).text(dayShorts[count-1]);
    $('#icon' + count).css('background-image', 'url(' + icons[count-1] + ')');
    $('#tHigh' + count).text(tempsHighF[count-1]);
    $('#tLow' + count).text(tempsLowF[count-1]);

    count+= 1;
    if(count === 11){
      count = 0;
    }
  }
  $('#cond').text(conditions[0])
}

function addCondData(feelsLike){
  console.log(feelsLike);
  $('#currentTemp').text(feelsLike);
}

function addCityData(city){
  $('#city').text(city);
}
