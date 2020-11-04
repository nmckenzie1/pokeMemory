const db = require("../models")
const passport = require("../config/passport");
module.exports = function(app){
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });
  app.post("/api/signup", function(req, res) {
        db.User.create({
          username: req.body.username,
          password: req.body.password,
          
        })
          .then(function() {
            res.redirect(307, "/api/login");
          })
          .catch(function(err) {
            res.status(401).json(err);
          });
      });
      app.get("/api/users", function(req, res) {
        // findAll returns all entries for a table when used with no options
        db.User.findAll({
          order:[["hiscore", "DESC"]]
        }).then(function(dbUser) {
          // We have access to the todos as an argument inside of the callback function
          res.json(dbUser);
        });
      });
     app.put("/api/user_data", function (req, res){
       console.log(req.body)
       db.User.update({
         hiscore: req.body.hiscore
       }, {
         where: {
           username: req.user.username
         }
       }).then(function(data){
         console.log(data)
         res.json(data)
       })
     }) 
      
      
      app.get("/api/user_data", function(req, res) {
        if (!req.user) {
          // The user is not logged in, send back an empty object
          res.json({});
        } else {
          // Otherwise send back the user's email and id
          // Sending back a password, even a hashed password, isn't a good idea
          res.json({
            username: req.user.username,
            hiscore: req.user.hiscore
          });
        }
      })};

      