const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const debug = require('debug')('app');
const cors = require('cors');
const { connect } = require('mongoose');

const toDoRouter = require('./src/routes/toDoRouter');
const UserRouter = require('./src/routes/userRouter');

const app = express();
const port = process.env.port || 7000;

connect('mongodb+srv://admin:admin@cluster0.epyuz.mongodb.net/toDoDB', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

app.use(cors());

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/lists', (toDoRouter));
app.use('/api/users', (UserRouter));

app.listen(port, () => debug(`server running in ${chalk.blue('http://localhost:7000/)')}`));
