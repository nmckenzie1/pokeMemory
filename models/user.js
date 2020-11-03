const bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
          },
        hiscore: DataTypes.INTEGER 
    },
        {freezeTableName: true}
    ); 
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      };
      // Hooks are automatic methods that run during various phases of the User Model lifecycle
      // In this case, before a User is created, we will automatically hash their password
      User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      });
    return User;
};


//can copy user.js from passport homework (require bcryptjs)
//can also copy config/passport.js, also middleware/isAuthenticated.js
