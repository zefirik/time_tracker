const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports.registration = (req, res) => {
         
        if(!req.body) return res.sendStatus(400);
                    
        const { username, email, password } = req.body;
        if(email !== null && email !== "" && password !== null && password !== "")
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

// заменить декодер на верификац токена при проверке
module.exports.decodetoken  = async (req, res) => {
  try{
      const token = req.body.token; 
      if(!token){return res.status(401);}
      const verified = jwt.verify(token, process.env.SECRET_TOKEN);
      console.log("VERIFY ID", verified.id)
      if (!verified) return res.json(false);
      await Users.findOne({
        where:{
            id: verified.id }
      })
      .then(user => {
        const {id, username} = user;
          const token = jwt.sign({ id: id, username: username }, process.env.SECRET_TOKEN, {
              expiresIn:43200  // 24 hours =  86400
             })
             res.json({auth: true, token: token, data:user});
      })
  } catch (e){
    res.status(500).json({ error: e.message })
    };
  };

module.exports.login = (req, res) => { 
    const { email, password } = req.body;

    Users.findOne({
        where:{
            email: email }
    })
    .then(user => {
        //console.log("TEST1",user);
        if (!user) {
          res.send({ message: "User Not found." });
        }else{
  
        let passwordIsValid = bcrypt.compareSync(
          password,
          user.password
        );
  
        if (passwordIsValid) {
          const {id, username} = user;
          const token = jwt.sign({ id: id, username: username }, process.env.SECRET_TOKEN, {
              expiresIn: 86400 // 24 hours
             })
             res.json({auth: true, token: token, result:user});  
           
        }else{res.send({message: "Invalid Password!"});}
      }
       
  })
         
}

