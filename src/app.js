const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicpath = path.join(__dirname, '../public');
const viewpath = path.join(__dirname, '../templates/views');
const partialspath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewpath);
hbs.registerPartials(partialspath);
app.use(express.static(publicpath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Krishna',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Krishna',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpmsg: 'This is a dynamic help message',
    title: 'HELP',
    name: 'Krishna',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'Must enter a valid address' });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'You must provide a search term' });
  }
  res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'This is error page for help section',
    title: 'help section 404',
    name: 'Krishna',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'page not found 404 error',
    title: '404',
    name: 'Krishna',
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server is up and running at port 3000');
});
