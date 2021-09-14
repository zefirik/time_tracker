const Operations = require('../models/operations');




module.exports.send = async (req, res) => {
         
        if(!req.body) return res.sendStatus(400);
                    
        const { operation, time, id, date } = req.body;
        console.log("REQUEST GET",req.body)

     await Operations.create({ operation, time, userId: id, date}).then(()=>{
        res.send('Recording successfully');
        console.log(req.body);
     }).catch(err=>console.log(err));
    };
