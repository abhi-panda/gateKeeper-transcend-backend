const Sequelize = require('sequelize');
const sequelize = new Sequelize('transcend', 'root', '' , {
  host: 'localhost',
  port: '3308',
  dialect: 'mysql'
});

sequelize.authenticate().then( function (err) {
  if (err) {
    console.log("There is connection in error");
  }
  else {
    console.log("Connection has been established");
  }
});
const db = {};
db.Guest = require('./guest')(sequelize, Sequelize);

sequelize.sync({  }).then ( (err) => {
  if (err) {
    console.log(err);
  }
});


module.exports = db;
