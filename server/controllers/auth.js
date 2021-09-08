const Users = require('../models/users');
const bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports.registration = (req, res) => {
         
        if(!req.body) return res.sendStatus(400);
             
        const { username, email, password } = req.body;
         bcrypt.hash(password, saltRounds, async (err, hash) =>{
            if(err){
            res.send({err: err})
            }
           
        await Users.create({ username, email, password: hash}).then(()=>{
            res.send('Create user was successful');
            console.log(req.body);
        }).catch(err=>console.log(err));
    });
 }