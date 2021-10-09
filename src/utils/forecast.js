const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=90cce4583151a099657e3c63b6255a89&query=${latitude},${longitude}`;

  request({ url: url, json: true }, (error, response) => {
    const { body } = response;
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location!', undefined);
    } else {
      const temperature = body.current.temperature;
      const feels = body.current.feelslike;
      const weather = body.current.weather_descriptions[0];
      const humidity = body.current.humidity;
      callback(undefined, `${weather}, ${humidity}% humidity. It is currently ${temperature} degress out and it feels like ${feels}.`);
    }
  })
}
module.exports = forecast;