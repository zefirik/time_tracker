require('dotenv').config();
const cors = require('cors');

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;
const db = require('./config/connection');



 
app.use(express.json());
app.use(cors());


//TEST DB
db.authenticate()
    .then(()=> console.log("Database connected..."))
    .catch(err => console.log('Error: '+ err));


app.listen(PORT, console.log(`Сервер ожидает подключения на ${PORT} порту...`));


const authRoutes = require('./routers/auth');
//const userRoutes = require('./routers/user');
app.use('/auth', authRoutes);
//app.use('/user', userRoutes);


