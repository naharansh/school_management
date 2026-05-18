const { DataTypes } = require('sequelize')
const Sequilize = require('../config/connection')
const role = Sequilize.define('roles', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description:{
         type: DataTypes.STRING,
       
    }
})
module.exports=role;