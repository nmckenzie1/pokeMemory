module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        highscore: DataTypes.INTEGER
    }); return User;
};

//can copy user.js from passport homework (require bcryptjs)
//can also copy config/passport.js, also middleware/isAuthenticated.js
