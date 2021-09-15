const Operations = require('../models/operations');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


module.exports.send = async (req, res) => {
         
        if(!req.body) return res.sendStatus(400);
                    
        const { operation, time, id, date } = req.body;
        console.log("REQUEST GET",req.body)

     await Operations.create({ operation, time, userId: id, date}).then(()=>{
        res.send('Recording successfully');
        console.log(req.body);
     }).catch(err=>console.log(err));
    };

module.exports.getIdReports = async (req, res) => {
        const idUser = req.query.id;
        console.log("SEND ID:",idUser);
        await Operations.findAll({where:{userId: idUser}, order:[['date', 'DESC']], raw:true}).then(result=>{
            res.send(result);
            console.log(result);
            
        }).catch(err=>console.log(err));
        
    }

module.exports.getFilterOperationsReports = async (req, res) => {
   
    const {id , filterOperation}= req.query;
    console.log("SEND PARAMS:",req.query);
    
    //await Operations.query(`SELECT * FROM operations WHERE id=${req.query.id} ORDER BY date`,

    await Operations.findAll({where:{
        userId: id,
        operation: filterOperation.toLowerCase(),
        // date: {
        //     [Op.between]: ["2021/09/08", "2021/09/14"]
        //     }
        }, order:[['date', 'DESC']], raw:true}).then(result=>{
        res.send(result);
        console.log(result);
        
    }).catch(err=>console.log(err));


}

