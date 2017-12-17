const express = require('express'),
  router = express.Router();

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Generator-Express MVC',
    pageName: 'landing',
  });
});

router.get('/who-we-are', (req, res) => {
  res.render('who-we-are', {
    title: 'Who we are',
    pageName: 'who-we-are',
  });
});
