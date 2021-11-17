export default class BikeRegService {  
  static getBikeReg(city) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      console.log(`${city}`);
      const url = `https://bikeindex.org/api/v3/search?page=1&per_page=10&location=${city}&distance=10&stolenness=proximity`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}