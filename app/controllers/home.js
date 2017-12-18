const express = require('express'),
  router = express.Router();

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Unchained | Homepage',
    pageId: 'landing',
    pageName: null,
    footerDisabled: true,
  });
});

router.get('/who-we-are', (req, res) => {
  res.render('who-we-are', {
    title: 'Unchained | Who we are',
    pageId: 'who-we-are',
    pageName: 'Who we are',
  });
});


router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Unchained | Get in touch',
    pageId: 'contact',
    pageName: 'Get in touch',
    footerDisabled: true,
  });
});

router.post('/contact', (req, res) => {
  res.render('contact', {
    title: 'Unchained | Get in touch',
    pageId: 'contact',
    pageName: 'Get in touch',
    footerDisabled: true,
    posted: true,
  });
});

router.get('/portfolio', (req, res) => {
  res.render('portfolio', {
    title: 'Unchained | Portfolio',
    pageId: 'portfolio',
    pageName: 'Portfolio',
  });
});

router.get('/what-we-do', (req, res) => {
  res.render('what-we-do', {
    title: 'Unchained | What we do',
    pageId: 'what-we-do',
    pageName: 'What we do',
  });
});

