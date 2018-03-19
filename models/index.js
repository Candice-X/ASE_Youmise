const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var fs = require('fs');
const path = require('path');
const basename  = path.basename(__filename);
var db = {};
const config = require('../config')

const sequelize = new Sequelize(config.db_name, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: config.db_host,
    port: 3306,
    logging: console.log,
    maxConcurrentQueries: 100,
    dialect: 'mysql',
    operatorsAliases: Op,
    dialectOptions: {
        ssl:'Amazon RDS'
    },
    pool: { maxConnections: 5, maxIdleTime: 30},
    language: 'en'
});

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     var model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });


db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = sequelize.import(path.join(__dirname, 'User.js'));

module.exports = db;
