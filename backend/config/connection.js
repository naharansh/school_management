const { Sequelize } = require('sequelize');

const connections = new Sequelize('sql12827337', 'sql12827337', 'XgQeB4eKQk', {
  host: "sql12.freesqldatabase.com",
  dialect: "mysql",
  port: 3306,
  logging: false
});

module.exports = connections;                                                                                                                