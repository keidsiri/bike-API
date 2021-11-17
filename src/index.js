import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeRegService from "./js/bike.js";

function mode(array) {
  if(array.length == 0)
      return null;
  let modeMap = {};
  let maxEl = array[0], maxCount = 1;
  for(var i = 0; i < array.length; i++) {
      let el = array[i];
      if(modeMap[el] == null) {
          modeMap[el] = 1; 
      } else {
          modeMap[el]++;
      }    
      if(modeMap[el] > maxCount) {
          maxEl = el;
          maxCount = modeMap[el];
      }
  }
  return maxEl;
}


$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let promise = BikeRegService.getBikeReg(city);
    promise.then(function(response) {
      const body = JSON.parse(response);

      let bikeBrand = [] ;
      for ( var i = 0 ; i < body.bikes.length ; i++) {
        bikeBrand.push(body.bikes[i].manufacturer_name);
      }

      let bikesInfo = [];
      for (let i = 0; i < body.bikes.length; i++) {
        if ( body.bikes[i].large_img !== null ) {
          bikesInfo.push(`<img src= ${body.bikes[i].large_img} class='bike-img'><br>`);
        } else {
          bikesInfo.push(`<img src="https://cdn.shopify.com/s/files/1/2081/1519/products/1600x1067_US_B_Blue_PROFILE.jpg?v=1590502980" class='bike-img'><br>`);
        }
        bikesInfo.push(`The bike info is <strong>${body.bikes[i].title}</strong><br>`);
        bikesInfo.push(`The manufacturer of the bike is ${body.bikes[i].manufacturer_name}<br>`);
        bikesInfo.push(`It was lost in ${body.bikes[i].stolen_location}<br>`);
        bikesInfo.push(`<a href=${body.bikes[i].url}>Click here for more details</a><br>`);
        bikesInfo.push(`The most common bike being stolen is ${mode(bikeBrand)}<br>`);
        $('.showBikes').html(bikesInfo);
      }  
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
  
    });
  });
});




// if ( body.bikes[i].large_img !== null ) {
//   bikesInfo.push(`<img src= ${body.bikes[i].large_img} class='bike-img'><br>`);
// } else {
//   bikesInfo.push(`./src/assets/images.bikes.jpg`)
// }

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
