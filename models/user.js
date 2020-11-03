module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        hiscore: DataTypes.INTEGER 
    },
    {freezeTableName: true}
    ); return User;
};


//can copy user.js from passport homework (require bcryptjs)
//can also copy config/passport.js, also middleware/isAuthenticated.js
