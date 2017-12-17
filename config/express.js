const express = require('express');
const glob = require('glob');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const config = require('./config');

const responsiveImage = (filePath, alt, sizes = '', attributes = '', imgAttributes = '') => {
  const dirname = path.dirname(filePath);
  const extname = path.extname(filePath);
  const filename = path.basename(filePath, extname);
  let normalSrcset = '';
  let webpSrcset = '';
  const fallbacks = [];
  let first = true;
  if (sizes !== '') {
    sizes = `sizes="${sizes}"`;
  }
  let lastValue = 1;
  for (const [key, value] of Object.entries(config.imageBreakpoints)) {
    normalSrcset += `${(first ? '' : ', ') + path.join(dirname, `${filename}-${key}${extname}`)} ${lastValue}w`;
    webpSrcset += `${(first ? '' : ', ') + path.join(dirname, `${filename}-${key}.webp`)} ${lastValue}w`;
    fallbacks.push(path.join(dirname, `${filename}-${key}${extname}`));
    first = false;
    lastValue = value;
  }
  const result = `<picture ${attributes}>
                <source type="image/webp" srcset="${webpSrcset}" ${sizes}>
                <img src="${fallbacks.pop()}" alt="${alt}" ${imgAttributes} srcset="${normalSrcset}" ${sizes}>
            </picture>`;
  return result;
};

module.exports = (app, config) => {
  app.locals.ENV = config.env;
  app.locals.ENV_DEVELOPMENT = config.env === 'development';
  app.locals.responsiveImage = responsiveImage;

  app.set('views', `${config.root}/app/views`);
  app.set('view engine', config.viewEngine);

  app.use(expressLayouts);
  app.set('layout', 'layouts/layout');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(`${config.root}/dist`));
  app.use(methodOverride());

  const controllers = glob.sync(`${config.root}/app/controllers/*.js`);
  controllers.forEach((controller) => {
    require(controller)(app);
  });

  app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use((err, req, res) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error',
      });
    });
  }

  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error',
    });
  });

  return app;
};
