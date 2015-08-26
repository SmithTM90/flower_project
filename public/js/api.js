'use strict';

window.userObj = {
    user_name: 'Derek',
    user_email: 'dwilliamrobertson@gmail.com',
    user_password: 'password',
    user_city: 'Seattle',
    user_state: 'WA',
    user_timer: 0,
    delayEmail: 0
}


var runTimer = function() {
  console.log(userObj.delayEmail, 5);
  console.log($('#emailDelay').val() + ', 6');
  var d = new Date();
  var expiration = Math.floor(d.getTime()/1000) + (userObj.delayEmail)
  clearInterval(userObj.user_timer);
  userObj.user_timer = setInterval("updateTimer(" + expiration + " )", 1000);
}

var updateTimer = function(expiration) {
      var d = new Date();
      var diff =parseInt(expiration)- Math.floor(d.getTime()/1000);
      var daysleft = Math.floor(diff / (24*60*60));
      var hoursleft = Math.floor((diff - 24*60*60*daysleft) / (60*60));
      var minutesleft = Math.floor( (diff - 24*60*60*daysleft - 60*60*hoursleft)/ (60) );
      var secondsleft = diff % (60);
      $('#output').html(daysleft + ' ' + hoursleft + ' ' + minutesleft + ' ' + secondsleft);

      if(secondsleft === 0) {
        onCompleteFunction();
      }
  };



var onCompleteFunction = function() {
  conditionsMet();
  ajaxFunction();
  runTimer();
}

var conditionsMet = function() {
  console.log('Checking conditions');
  if(userObj.temp <= tenDayObj.tempHighAvg) {
    console.log('Hit if');
    $('#alertMessageDiv').append('<p class ="alertMessage">Hey ' + userObj.user_name + ', Just a reminder to take care of your plants! It has been ' + userObj.delayEmail + ' days since your last notification. In that time the average temperature has been ' + tenDayObj.tempHighAvg + ' and there has been ' + tenDayObj.precipInTotal + ' inches of rain. Be sure to show your plants some love!</p>');
  }
  else if (userObj.precip >= tenDayObj.precipInTotal){
    console.log('Hit else if');
    $('#alertMessageDiv').append('<p class ="alertMessage">Hey ' + userObj.user_name + ' , Just a reminder to take care of your plants! It has been ' + userObj.delayEmail + ' days since your last notification. In that time the average temperature has been ' + tenDayObj.tempHighAvg + ' and there has been ' + tenDayObj.precipInTotal + ' inches of rain. Be sure to show your plants some love!</p>');
  }
  else {
    console.log('Hit else');
    $('#alertMessageDiv').append('<p id="noWorriesMessage">Hey ' + userObj.user_name + ' , The temperature and amount of rain have been adequate and your plants should be doing fine, but dont forget to check on them anyway, plants need love!</p>');
  }
}

var dailyWeatherArray;
var newDailyWeatherArray = [];

var DailyWeather = function(tempHigh, precipIn) {
  this.tempHigh = tempHigh;
  this.precipIn = precipIn;
}
var calls = 0;
var ajaxFunction = function() {
  if (calls < 10){
    $.ajax( {
    url: 'http://api.wunderground.com/api/ced427b045171f6a/forecast10day/q/WA/Seattle.json',
    method: 'GET'
  })
  .done(function(result) {
  initPage(result);
  });
  }
  calls++;
}


var initPage = function(response) {

  console.log(response);

  dailyWeatherArray = response.forecast.simpleforecast.forecastday;

  for(var i = 0; i < dailyWeatherArray.length; i++) {

    var day = dailyWeatherArray[i];
    var tempHigh = day.high.fahrenheit;
    var precipIn = day.qpf_allday.in;

    var newDay = new DailyWeather(tempHigh, precipIn);
    newDailyWeatherArray.push(newDay);
  }
  console.log(newDailyWeatherArray);

  var tempHighSum = 0;
  var precipInSum = 0;

  for(var j = 0; j < newDailyWeatherArray.length; j++) {
    tempHighSum += parseInt(newDailyWeatherArray[j].tempHigh);
  }
  var tempHighAvg = tempHighSum/newDailyWeatherArray.length;

  for(var l = 0; l < newDailyWeatherArray.length; l++) {
    precipInSum += parseFloat(newDailyWeatherArray[l].precipIn);
  }
  var precipInTotal = precipInSum;
  console.log(precipInTotal);
  //I used window. to make my object global but still use it in my .done function
  window.tenDayObj = {
    tempHighAvg: tempHighAvg,
    precipInTotal: precipInTotal,
    dailyWeather: newDailyWeatherArray
  }
  console.log(window.tenDayObj);
  //mock user object for my code to interact with


  var userEmailButton = $('#userEmailButton');

  userEmailButton.click(function() {
    console.log('click');
    window.userObj.temp = parseInt($('#userTemp').val());
    window.userObj.precip = parseInt($('#userPrecip').val());
    window.userObj.emailTime = parseInt($('#reminderTime').val());
    window.userObj.delayEmail = parseInt($('#emailDelay').val());
    console.log(window.userObj);
    $('#alertMessageDiv').append('<p id="newSignUp">Thanks ' + userObj.user_name + ' for signing up for our notifications. You are the best!</p>')


    runTimer();




    // conditionsMet();
  });
  console.log(userObj);
};

$(document).ready(function() {
  console.log('ready');
  ajaxFunction();
});

