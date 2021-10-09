const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGFtYXJpIiwiYSI6ImNrdWgwNGxqZzAycG0yb3F0YTZyZnNiNHQifQ.JrYP4KWV1wZkYKlBrO1e5A&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    const { body } = response;
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.message || body.features.length === 0) {
      callback('Unable to find location, try another search term!', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode;