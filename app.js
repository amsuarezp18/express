var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const { Sequelize, Model, DataType, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

class Message extends Model{}
Message.init({
    message: DataTypes.TEXT,
    author: DataTypes.STRING,
    ts: DataTypes.INTEGER, 
    },
    { sequelize, modelName: 'messages'}
    
    );

(async () => {
    await sequelize.sync();
    const angelita = await Message.create({
        message: 'Hola mundo feo',
        author: 'Angelita Bonita',
        ts: 23456543,
    });
    console.log(angelita.toJSON());
})();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
