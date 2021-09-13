const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/connection');

const Operations = db.define('operations',{
    operation: {
        type: DataTypes.STRING
    },
    time: {
        type: DataTypes.INTEGER 
    },
    userId: {
        type: DataTypes.STRING
    }
});

module.exports = Operations;