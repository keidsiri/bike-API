export default class BikeRegService {  
  static getBikeReg(city) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://bikeindex.org/api/v3/search?page=1&per_page=10&location=${city}&distance=200&stolenness=proximity`;
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

  //Add another function for most frequent value from array
  mode(array) {
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
}

