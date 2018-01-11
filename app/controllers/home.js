const express = require('express'),
  router = express.Router(),
  nodemailer = require('nodemailer');

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

router.post('/contact', (req, res, next) => {
  const details = req.body,
    transporter = nodemailer.createTransport({
      sendmail: true,
      newline: 'unix',
    });

  transporter.sendMail({
    from: details.email,
    to: 'hello@unchained.studio',
    subject: `${details.name} has contacted you.`,
    text: `Hey,\n\nI would like to ${details.action}. Shoot me back an e-mail at ${details.email}. \n\nCheers, ${details.name}.`,
  });
  next();
}, (req, res) => {
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

