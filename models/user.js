const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        highscore: DataTypes.INTEGER
    }); return User;
};