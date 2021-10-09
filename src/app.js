const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Amari Pierre'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name: 'Amari Pierre'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name: 'Amari Pierre',
    message: 'If you need some help, here is where you\'ll be able to find everything you need!'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You must provide an adress' });
  }
  // Calling geocode with a default value of data object to avoid the server to crash if there is no address value
  geocode(req.query.address, (error, data = {}) => {
    const { latitude, longitude, location } = data;
    if (error) {
      return res.send({ error: error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error: error });
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'ERROR 404',
    name: 'Amari Pierre',
    errorMessage: 'Help article not found.'
  });
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'ERROR 404',
    name: 'Amari Pierre',
    errorMessage: 'Page not found.'
  });
})

app.listen(3000, () => {
  console.log("Server is up on port 3000!");
});