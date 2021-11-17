import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeRegService from "./js/bike.js";

// function clearFields() {
//   $('#location').val("");
// }

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let promise = BikeRegService.getBikeReg(city);
    promise.then(function(response) {
      const body = JSON.parse(response);
      for (let i = 0; i < body.bikes.length; i++) {
        $('.brandName').append(`The manufacturer of the bike is ${body.bikes[i].manufacturer_name} }`);
        $('.image').append('<img src="' + body.bikes[i].large_img + '">');
      }  
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
  
    });
  });
});





//example

// function clearFields() {
//   $('#location').val("");
//   $('.showErrors').text("");
//   $('.showHumidity').text("");
//   $('.showTemp').text("");
// }

// $(document).ready(function() {
//   $('#weatherLocation').click(function() {
//     let city = $('#location').val();
//     clearFields();
//     let promise = WeatherService.getWeather(city);
//     promise.then(function(response) {
//       const body = JSON.parse(response);
//       $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
//       $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
//     }, function(error) {
//       $('.showErrors').text(`There was an error processing your request: ${error}`);
//     });
//   });
// });