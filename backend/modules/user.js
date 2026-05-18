const { DataTypes } = require('sequelize')
const Sequilize = require('../config/connection');
const role = require('./roles');
const user = Sequilize.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 6,
            notNull: false,


        }
    },
    status: {
        type: DataTypes.ENUM('active', 'Inactive'),
        defaultValue: 'active',
        validate: {
            isIn: {
                args: ['active', 'Inactive'],
                msg: "Must be English or Chinese"
            }
        }
    },
    role_id: {               // 🔥 FOREIGN KEY COLUMN
      type: DataTypes.UUID,
      allowNull: false,
       references: {
      model: role,
      key: 'id'
    }

    },
    otp: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    otp_expiry:{
        type:DataTypes.DATE,
        defaultValue:null,
    },
    last_login:{
        type:DataTypes.DATE,
        defaultValue:null,
    }
})
module.exports = user;