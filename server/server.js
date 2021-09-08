require('dotenv').config();

const express = require("express");

 
const app = express();

const PORT = process.env.PORT || 3001;
const db = require('./config/connection');
 
//определяем объект Sequelize

//TEST DB
db.authenticate()
    .then(()=> console.log("Database connected..."))
    .catch(err => console.log('Error: '+ err));

app.get ('/start', (req, res) => res.send('HELLO!'));

app.listen(PORT, console.log(`Сервер ожидает подключения на ${PORT} порту...`));
     