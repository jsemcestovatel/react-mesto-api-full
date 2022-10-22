require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routes = require('./routes/index');
const { handlerErrors } = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { cors } = require('./middlewares/cors');

const app = express();

// app.use(cors);
app.use(cors({
  origin: 'https://mesto-frontend-jc.nomoredomains.icu',
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
});

// подключаем логгер запросов
app.use(requestLogger);

// crash-test сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// маршрутизация
app.use(routes);

// подключаем логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use(handlerErrors);

module.exports = app;
