const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var fs = require('fs');
const path = require('path');
const basename  = path.basename(__filename);
var db = {};
const config = require('../config')
let sequelize
if (process.env.NODE_ENV === 'test'){
    sequelize = new Sequelize(config.DB_NAME,process.env.DB_USERNAME, process.env.DB_PASSWORD , {
        host: config.DB_HOST,
        port: 3306,
        logging: console.log,
        maxConcurrentQueries: 100,
        dialect: 'mysql',
        operatorsAliases: Op,
        pool: { maxConnections: 5, maxIdleTime: 30},
        language: 'en'
    });
    console.log("test environment");
} else{
    sequelize = new Sequelize(config.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: config.DB_HOST,
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
}
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     var model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

sequelize.authenticate()
        .then(function(err) {
            if (!!err) {
                console.log('Unable to connect to the database:', err)
            } else {
                console.log('Connection has been established successfully.')
            }
        });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = sequelize.import(path.join(__dirname, 'User.js'));
db.Card = sequelize.import(path.join(__dirname, 'Card.js'));
db.Record = sequelize.import(path.join(__dirname, 'Record.js'));
db.FriendRequest = sequelize.import(path.join(__dirname, 'FriendRequest.js'));
db.Friendship = sequelize.import(path.join(__dirname, 'Friendship.js'));
// Testing connection: 03/20/2018 HYY
// sequelize
//     .authenticate()
//     .then(()=>{
//         console.log('Connection has been established successfully.');
//     })
//     .catch((e)=>{
//         console.log('Unable to connect to the database:',e);
//     });

module.exports = db;
