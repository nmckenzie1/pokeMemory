module.exports = function(sequelize, DataTypes) {
    let Pokemon = sequelize.define("Pokemon", {
        name: DataTypes.STRING,
    }); return Pokemon;
};
