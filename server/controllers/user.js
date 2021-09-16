const Operations = require('../models/operations');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const sequelize= require('../config/connection');


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
        // await Operations.findAll({where:{userId: idUser}, order:[['date', 'DESC']], raw:true}
        await sequelize.query(`
            SELECT * FROM "operations"
            WHERE "userId" = ${idUser}
            ORDER BY date DESC
        `).then(result=>{
            res.send(result);
            console.log(result);          
        }).catch(err=>console.log(err));
        
    }

module.exports.getFilterOperationsReports = async (req, res) => {
   
    const {id , filterOperation, startDate, endDate }= req.query;
    console.log("ENTER PARAMS:",req.query);
      
    await sequelize.query(`
            SELECT * FROM "operations"
            WHERE "userId" = '${id}' AND "operation" = '${filterOperation}' AND ("date" BETWEEN '${startDate}' AND '${endDate}')
        `)
        .then(result=>{
        res.send(result);
        console.log(result);
        
    }).catch(err=>console.log(err));
   


}

