const path = require("path")

//const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports =  function(app){
    app.get("/", function(req, res) {
        if (req.user) {
            res.redirect("/game");
          }
        res.sendFile(path.join(__dirname, "../public/login.html"))
    },
    
};