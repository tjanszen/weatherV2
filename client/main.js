'use strict';

$(document).ready(clickNsa);

function clickNsa() {
  var options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
  navigator.geolocation.getCurrentPosition(success, error, options)
}

function success(pos) {
  var urlInfo = 'http://api.wunderground.com/api/5ac2a3bc4dece267/forecast10day/q/' + pos.coords.latitude +',' +   pos.coords.longitude + '.json';
  var urlCond = 'http://api.wunderground.com/api/5ac2a3bc4dece267/conditions/q/' + pos.coords.latitude +',' +   pos.coords.longitude + '.json';
  var urlCity = 'http://api.wunderground.com/api/5ac2a3bc4dece267/geolookup/q/' + pos.coords.latitude +',' +   pos.coords.longitude + '.json';
  var urlHourly = 'http://api.wunderground.com/api/5ac2a3bc4dece267/hourly10day/q/' + pos.coords.latitude +',' +   pos.coords.longitude + '.json';
  getForecastData(urlInfo);
  getHourlyData(urlHourly);
  getCondData(urlCond);
  getCityData(urlCity);
}

function error(err) {
  console.log('could not find your position', err)
}

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
      dates.push(a['date']['day']);
      dayShorts.push(a['date']['weekday']);
      tempsHighF.push(a['high']['fahrenheit']);
      tempsLowF.push(a['low']['fahrenheit']);
      conds.push(a['conditions']);
      icons.push(a['icon_url']);
      conditions.push(a['conditions']);
      monthShort.push(a['date']['monthname_short']);
    })
    addForecastData(dates, dayShorts, tempsHighF, tempsLowF, conds, icons, conditions, monthShort);
    })
}

function getHourlyData(urlHourly){
  var hour = "";
  var temp = "";
  var icon = "";
  var hours = [];
  var hourlys = [];

  $.getJSON(urlHourly, function(response) {
    response.hourly_forecast.forEach(function(a){
      hour = a['FCTTIME']['hour'];
      hours.push(hour)
      temp = a['temp']['english'];
      hours.push(temp)
      icon = a['icon_url'];
      hours.push(icon)
      hourlys.push(hours);
      hours = [];
    })
    addHourlyData(hourlys);
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
var state = ""
  $.getJSON(urlCity, function(response) {
    city = response.location['city'];
    state = response.location['state'];
    addCityData(city, state);
  })
}

function addForecastData(dates, dayShorts, tempsHighF, tempsLowF, conds, icons, conditions, monthShort){
  var count = 1;
  for(var i = 0; i < 11; i++){
    $('#day' + count).text(dayShorts[count-1]);
    $('#icon' + count).css('background-image', 'url(' + icons[count-1] + ')');
    $('#tHigh' + count).text(tempsHighF[count-1]);
    $('#tLow' + count).text(tempsLowF[count-1]);
    $('#day1').text('Today')

    count+= 1;
    if(count === 11){
      count = 0;
    }
  }
  $('#cond').text(conditions[0])
  $('#monthDay').text(monthShort[0] + " " + dates[0]);
}

function addCondData(feelsLike){
  $('#currentTemp').text(Math.round(feelsLike));
}

function addCityData(city, state){
  $('#city').text(city + ", " + state);
}

function addHourlyData(hourlys){
// var hourlyHour = "";
// var hourlyTemp = "";
// var hourlyIcon = "";
// var $hourlyHour = $('.hourlyHour');
// var $hourlyTemp = $('.hourlyTemp');
// var $hourlyIcon = $('.hourlyIcon');
// var count = 0;
//
//   for(var i = 0; i < 24; i++){
//     $hourlyHour.append($('<div>').text(hourlys[i][0] + ":00 " + hourlys[i][1]));
//     debugger;
//     if(hourlys[i][0] === "23"){
//     return;
//     }
//   }
}
