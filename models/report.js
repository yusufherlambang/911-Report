'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    get formatDateOfEvent() {
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return this.dateOfEvent.toLocaleDateString('id-ID', options)
    }

    get formatEditFormDOE() {
      return this.dateOfEvent.toISOString().substring(0, 10);
    }

    static maxAge() {
      return Report.findAll({
        attributes: [[sequelize.fn('max', sequelize.col('age')),'maxAge']]
      })                   
    }

    static minAge() {
      return Report.findAll({
        attributes: [[sequelize.fn('min', sequelize.col('age')),'minAge']]
      })
    }

    static averageAge() {
      return Report.findAll({
        attributes: [[sequelize.fn('avg', sequelize.col('age')),'averageAge']]
      })
    }

  }
  Report.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: DataTypes.STRING,
    nik: DataTypes.STRING,
    event: DataTypes.STRING,
    description: DataTypes.TEXT,
    photo: DataTypes.STRING,
    dateOfEvent: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};