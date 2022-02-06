const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./config/swagger.config.json');
const swaggerJsdoc = require("swagger-jsdoc");
const helmet = require('helmet')
const { format } = require('date-fns')
const cors = require('cors')

//importing routers
const { indexRouter, usersRouter } = require('./routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// morgan setup
morgan.token('date', (req, res) => {
  return format(new Date, 'yyyy-MM-dd HH:mm:ss')
})
morgan.format('myformat', '[:date] :method :url :status :res[content-length] - :response-time ms');

//swagger setup
const specs = swaggerJsdoc(swaggerDoc);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: `
  .swagger-ui .topbar { background-color: #fff; border-bottom: 4px solid #01b351; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; }
  .swagger-ui .topbar .download-url-wrapper input[type=text] { border: 2px solid #01b351; border-radius: 4px 0 0 4px; }`,
  customSiteTitle: "My Documentation",
  explorer: true
}));

//express middlewares 
app.use(morgan('myformat'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cors({ origin: "*" }));

//routers setup
app.use('/', indexRouter);
app.use('/users', usersRouter);

//health route
app.get('/health', (req, res) => {
  res.send("OK from this application");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
