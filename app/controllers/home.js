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
