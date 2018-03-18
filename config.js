const config = require('./configs/config.env.json');

const env = process.env.NODE_ENV || 'development'

module.exports = config[env];
