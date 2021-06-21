'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Statement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.project);
      this.belongsTo(models.user);
    }
  };
  Statement.init({
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    verb: DataTypes.STRING,
    object: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'statement',
  });
  return Statement;
};