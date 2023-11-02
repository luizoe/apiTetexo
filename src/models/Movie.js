const path = require('path');
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, '../../database', 'database.sqlite'),
});

class Movie extends Model {};
Movie.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  studios: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  producers: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  winner: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
},
{
  sequelize,
  modelName: "Movie",
  timestamps: false,
  freezeTableName: true
});

module.exports = Movie;