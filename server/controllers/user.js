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
        const id = req.query.id;
        console.log("SEND ID:",id);
        // await Operations.findAll({where:{userId: idUser}, order:[['date', 'DESC']], raw:true}
        await sequelize.query(`
            SELECT * FROM "operations"
            WHERE "userId" = ${id}
            ORDER BY date DESC
        `).then(result=>{
            res.send(result);
            console.log(result,"-------------------------------------------");          
        }).catch(err=>console.log(err));
    }

module.exports.getFilterOperationsReports = async (req, res) => {
   
    const {id , filterOperation, startDate, endDate }= req.query;
    console.log("ENTER PARAMS:",req.query);
    let findFilter ="";
    let findPeriod ="";
    if(filterOperation !==  null && filterOperation !== undefined && filterOperation !== ""){
        findFilter = `AND "operation" LIKE '%${filterOperation}%' `;
    }
    if(startDate !== null && startDate !== undefined && endDate !==  null && endDate !== undefined){
       findPeriod = `AND "date" BETWEEN '${startDate}' AND '${endDate}'`;
    }
      
    await sequelize.query(`
            SELECT * FROM "operations"
            WHERE "userId" = '${id}' ${findFilter}  ${findPeriod}
            ORDER BY date DESC
        `)
        .then(result=>{
        res.send(result);
        console.log(result,"***********************************************************");
        
    }).catch(err=>console.log(err));
   
}

module.exports.delOperationReports = async (req, res) => {
    const id = req.query.itemId;
    console.log("DELETE ID:",id);

    await sequelize.query(`
        DELETE FROM "operations"
        WHERE "id" = ${id}
    `).then(result=>{
        res.send(result);
        console.log(result,"###########################################################");          
    }).catch(err=>console.log(err));
}


