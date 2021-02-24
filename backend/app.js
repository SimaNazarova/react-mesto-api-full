const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors = require('cors');

const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users.js');

const errorHandler = require('./middlewares/errorHandler');

const { userValidation, userRegister } = require('./middlewares/validation');

require('dotenv').config();


const app = express();

const { PORT = 3000 } = process.env;

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// eslint-disable-next-line no-console
mongoose.connection.on('open', () => console.log('DB is connected'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.post('/signup', userRegister, createUser);
app.post('/signin', userValidation, login);

app.use(errorLogger);
app.use(errors());

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
