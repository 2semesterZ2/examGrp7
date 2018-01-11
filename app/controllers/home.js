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
  const details = req.body;
  // const transporter = nodemailer.createTransport({
  //   sendmail: true,
  //   newline: 'unix',
  // });
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'hello@unchained.studio',
      accessToken: 'ya29.Gls_BTqSJc9TQ2ecsagvU7AGKoaQwmZnkLqb7xVL5DXskwWl4Ln11vHmcSwnlsuxT4oHhAeuuBQ9Zp5vqA4uk-3rKj6_UI2JmFi2XbV6ZoW4LA2a5wPVgTtaY8dJ',
      refreshToken: '1/sjOA6WftIkHi1i8h1EqnAR9tTDJV7iEY2brxIgwHtjk',
    },
  });

  // verify connection configuration
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
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

