// create sequalize connection
const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
module.exports = new Sequelize('sequelize', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});