'use strict';

window.userObj = JSON.parse(localStorage.getItem('user'));

var userEmailButton = $('#userEmailButton');

  userEmailButton.click(function() {
    window.userObj.temp = parseInt($('#userTemp').val());
    window.userObj.precip = parseInt($('#userPrecip').val());
    window.userObj.amountOfDays = parseInt($('#amountOfDays').val());
    window.userObj.delayEmail = parseInt($('#emailDelay').val());
    console.log(window.userObj);
    $('#alertMessageDiv').html('');
    $('#alertMessageDiv').append('<p id="newSignUp">Thank you ' + userObj.user_name + ' for signing up for our notifications. You are the best!</p>')

    runTimer();
  });


var runTimer = function() {
  var d = new Date();
  var expiration = Math.floor(d.getTime()/1000) + userObj.delayEmail;
  clearInterval(userObj.user_timer);
  userObj.user_timer = setInterval(function() {
    updateTimer(expiration);
  }, 1000);
}

var updateTimer = function(expiration) {
    var d = new Date();
    var diff =parseInt(expiration) - Math.floor(d.getTime()/1000);
    var daysleft = Math.floor(diff / (24*60*60));
    var hoursleft = Math.floor((diff - 24*60*60*daysleft) / (60*60));
    var minutesleft = Math.floor( (diff - 24*60*60*daysleft - 60*60*hoursleft)/ (60) );
    var secondsleft = diff % (60);
    $('#output').html('Time until next alert - ' + ' Days: ' + daysleft + ' Hours: ' + hoursleft + ' Min: ' + minutesleft + ' Secs: ' + secondsleft);

    if(daysleft === 0 && hoursleft === 0 && minutesleft === 0 && secondsleft === 0) {
      onCompleteFunction();
    }
};



var onCompleteFunction = function() {
  $('#alertMessageDiv').html('');
  ajaxFunction();
  conditionsMet();
  runTimer();
}

var conditionsMet = function() {
  console.log('Checking conditions');
  var daysElement = $('#emailDelay option:selected').text();
  var dataCollectionTime = $('#amountOfDays option:selected').text();
  if(userObj.temp <= tenDayObj.tempHighAvg) {
        $('#alertMessageDiv').append('<p class ="alertMessage">Hey ' + userObj.user_name + ', Just a reminder to take care of your plants! It has been ' + daysElement + ' since your last notification. During the last ' + dataCollectionTime + ' the average temperature has been ' + tenDayObj.tempHighAvg + ' and there has been ' + tenDayObj.precipInTotal + ' inches of rain. Be sure to show your plants some love!</p>');
  }
  else if (userObj.precip >= tenDayObj.precipInTotal){
    $('#alertMessageDiv').append('<p class ="alertMessage">Hey ' + userObj.user_name + ' , Just a reminder to take care of your plants! It has been ' + daysElement + ' since your last notification. During the last ' + dataCollectionTime + ' the average temperature has been ' + tenDayObj.tempHighAvg + ' and there has been ' + tenDayObj.precipInTotal + ' inches of rain. Be sure to show your plants some love!</p>');
  }
  else {
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
    url: 'http://api.wunderground.com/api/ced427b045171f6a/forecast10day/q/' + window.userObj.user_state + '/' + window.userObj.user_city + '.json',
    method: 'GET'
  })
    .done(function(result) {
    initPage(result);
    });
  }
  calls++;

  // var newObj = {
  //   forecast: {
  //     simpleforecast: {
  //       forecastday: [
  //         {
  //           high: {
  //             fahrenheit: 80
  //           },
  //           qpf_allday: {
  //             in: 2
  //           }
  //         },
  //         {
  //           high: {
  //             fahrenheit: 60
  //           },
  //           qpf_allday: {
  //             in: 1.2
  //           }
  //         },
  //         {
  //           high: {
  //             fahrenheit: 75
  //           },
  //           qpf_allday: {
  //             in: 0
  //           }
  //         },
  //         {
  //           high: {
  //             fahrenheit: 69
  //           },
  //           qpf_allday: {
  //             in: 0
  //           }
  //         },
  //         {
  //           high: {
  //             fahrenheit: 65
  //           },
  //           qpf_allday: {
  //             in: 0.5
  //           }
  //         },
  //         {
  //           high: {
  //             fahrenheit: 78
  //           },
  //           qpf_allday: {
  //             in: 1
  //           }
  //         },
  //         {
  //           high: {
  //             fahrenheit: 80
  //           },
  //           qpf_allday: {
  //             in: 2
  //           }
  //         },
  //         {
  //           high: {
  //             fahrenheit: 95
  //           },
  //           qpf_allday: {
  //             in: 0.6
  //           }
  //         },
  //         {
  //           high: {
  //             fahrenheit: 68
  //           },
  //           qpf_allday: {
  //             in: 1.5
  //           }
  //         },
  //         {
  //           high: {
  //             fahrenheit: 70
  //           },
  //           qpf_allday: {
  //             in: 2.5
  //           }
  //         }
  //       ]
  //     }
  //   }
  // }

  // initPage(newObj);
}



var initPage = function(response) {

  dailyWeatherArray = response.forecast.simpleforecast.forecastday;
  console.log(dailyWeatherArray);

  for(var i = 0; i < dailyWeatherArray.length; i++) {

    var day = dailyWeatherArray[i];
    var tempHigh = day.high.fahrenheit;
    var precipIn = day.qpf_allday.in;

    var newDay = new DailyWeather(tempHigh, precipIn);
    newDailyWeatherArray.push(newDay);
  }

  var tempHighSum = 0;
  var precipInSum = 0;
  console.log(window.userObj.amountOfDays);

  for(var j = (newDailyWeatherArray.length - window.userObj.amountOfDays); j < newDailyWeatherArray.length; j++) {
    tempHighSum += parseInt(newDailyWeatherArray[j].tempHigh);
  }
  var tempHighAvg = (tempHighSum/window.userObj.amountOfDays).toFixed(2);

  for(var l = (newDailyWeatherArray.length - window.userObj.amountOfDays); l < newDailyWeatherArray.length; l++) {
    precipInSum += parseFloat(newDailyWeatherArray[l].precipIn);
  }
  var precipInTotal = precipInSum;
  //I used window. to make my object global but still use it in my .done function
  window.tenDayObj = {
    tempHighAvg: tempHighAvg,
    precipInTotal: precipInTotal,
    dailyWeather: newDailyWeatherArray
  }

};

$(document).ready(function() {
  ajaxFunction();
});

