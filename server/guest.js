'use strict'

module.exports = (sequelize, DataTypes) => {

  const Guest = sequelize.define('guest' , {
    uid : {
      type : DataTypes.STRING,
      allowNull:false,
      primaryKey : true
    },
    name : {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalAdults : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    totalKids : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    adultsArrived : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    kidsArrived : {
      type : DataTypes.INTEGER,
      allowNull : false
    }
  });
  return Guest;
}