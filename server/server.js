require('dotenv').config();
const cors = require('cors');

const express = require("express");
const app = express();

//const jwt = require ('jsonwebtoken')


const PORT = process.env.PORT || 3001;
const db = require('./config/connection');
//const Users = require('./models/users.js');


 
app.use(express.json());
app.use(cors());


//TEST DB
db.authenticate()
    .then(()=> console.log("Database connected..."))
    .catch(err => console.log('Error: '+ err));

app.get ('/start', (req, res) => res.send('HELLO!'));

app.listen(PORT, console.log(`Сервер ожидает подключения на ${PORT} порту...`));


const authRoutes = require('./routers/auth');
app.use('/auth', authRoutes);
// app.post("/auth/registration", (req, res) => {
//          
//         if(!req.body) return res.sendStatus(400);
//              
//         const { username, email, password } = req.body;
//          bcrypt.hash(password, saltRounds, async (err, hash) =>{
//             if(err){
//             res.send({err: err})
//             }
//             console.log("PASSWORD_HASH",hash);
//         await Users.create({ username, email, password: hash}).then(()=>{
//             res.send('Create user was successful');
//             console.log(req.body);
//         }).catch(err=>console.log(err));
//     });
//  });


