const path = require("path");
let isAuthenticated = require("../config/middleware/isAuthenticated");
module.exports = function (app) {
    app.get("/", function (req, res) {
       
        if (req.user) {
            res.redirect("/game");
        };
        res.sendFile(path.join(__dirname, "../public/login.html"))
    });
    app.get("/signup", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/game");
        };
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });
    app.get("/game", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/game.html"));
    });
    
    app.get("/hiscores", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/hiscores.html"));
    });
};