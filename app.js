const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const regionsRouter = require('./routes/regions')
const cellarsRouter = require('./routes/cellars') 
const soilsRouter = require('./routes/soils') 
const countriesRouter = require('./routes/countries') 
const wineTypesRouter = require('./routes/wineTypes') 
const winesRouter = require('./routes/wines')      
const grapesRouter = require('./routes/grapes')      
const iconsRouter = require('./routes/icons')
const stocksRouter = require('./routes/stocks')
const pricesRouter = require('./routes/prices') 
const sulphitesRouter = require('./routes/sulphites')
const authRouter = require('./routes/auth')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/regions', regionsRouter)
app.use('/cellars', cellarsRouter)
app.use('/soils', soilsRouter)
app.use('/countries', countriesRouter)
app.use('/wineTypes', wineTypesRouter)
app.use('/wines', winesRouter)
app.use('/grapes', grapesRouter)
app.use('/icons', iconsRouter)
app.use('/stocks', stocksRouter)
app.use('/prices', pricesRouter)
app.use('/auth', authRouter)
app.use('/sulphites', sulphitesRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
