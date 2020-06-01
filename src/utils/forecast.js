const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.openweathermap.org/data/2.5/onecall?lat=' +
    encodeURIComponent(latitude) +
    '&lon=' +
    encodeURIComponent(longitude) +
    '&%20&appid=dc3ba8de0928bb79ac3216c6f170d098';

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather service');
    } else if (body.message) {
      callback('Unable to find location');
    } else {
      //   callback(undefined, {
      //     summary: res.body.current.weather[0].description,
      //     temp: res.body.current.temp,
      //     rain: res.body.current.clouds,
      //   });
      callback(
        undefined,
        body.current.weather[0].description +
          '. It is currently ' +
          body.current.temp +
          'F out. There is a ' +
          body.current.clouds +
          '% chance of rain'
      );
    }
  });
};

module.exports = forecast;
