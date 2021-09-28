const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/connection');

const Users = db.define('users',{
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
});

module.exports = Users;