const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

require('dotenv').config();

const { errors } = require('celebrate');
const cors = require('cors');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const errorHandler = require('./middlewares/errorHandler');
const { userValidation, userRegister } = require('./middlewares/validation');
const controller = require('./controllers/users');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// eslint-disable-next-line no-console
mongoose.connection.on('open', () => console.log('DB is connected'));

const { PORT = 3000 } = process.env;

// app.use((req, res, next) => {
//   req.user = {
//     _id: '60099ce5a7dc074534a80bcb',
//   };
//   next();
// });

app.use(() => {
  // eslint-disable-next-line no-console
  console.log('work');
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', userRegister, controller.createUser);

app.post('/signin', userValidation, controller.login);

app.use('/', cardsRouter);
app.use('/', usersRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
