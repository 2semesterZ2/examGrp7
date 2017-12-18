const express = require('express'),
  router = express.Router();

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Generator-Express MVC',
    pageId: 'landing',
    pageName: null,
    footerDisabled: true,
  });
});

router.get('/who-we-are', (req, res) => {
  res.render('who-we-are', {
    title: 'Who we are',
    pageId: 'who-we-are',
    pageName: 'Who we are',
  });
});

router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Get in touch',
    pageId: 'contact',
    pageName: 'Get in touch',
    footerDisabled: true,
  });
});
