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
          hiscore: null
        })
          .then(function() {
            res.redirect(307, "/api/login");
          })
          .catch(function(err) {
            res.status(401).json(err);
          });
      });
    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
          // The user is not logged in, send back an empty object
          res.json({});
        } else {
          // Otherwise send back the user's email and id
          // Sending back a password, even a hashed password, isn't a good idea
          res.json({
            username: req.user.username,
            id: req.user.hiscore
          });
        }
      })};