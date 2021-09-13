const Operations = require('../models/operations');




module.exports.send = async (req, res) => {
         
        if(!req.body) return res.sendStatus(400);
                    
        const { operation, time, id } = req.body;
        console.log("REQUEST GET",req.body)
       
     await Operations.create({ operation, time, userId: id}).then(()=>{
        res.send('Create user was successful');
        console.log(req.body);
     }).catch(err=>console.log(err));
    };
