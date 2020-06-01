const request = require('request');

const geoCode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?limit=1&access_token=pk.eyJ1IjoiaGVsbDEyIiwiYSI6ImNrYXVpZzUyMzAyMmEyeHBjcXJtanpmOHIifQ.QPegFhFQE3jGboIj5_ZXkA';
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to get the location services, internet not working');
    } else if (body.features.length === 0) {
      callback('Unable to find the location, try with some other location');
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
