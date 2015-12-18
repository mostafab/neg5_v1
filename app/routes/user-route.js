var userController = require('../../app/controllers/user-controller');
var passportP = require("passport");
var passport = require("../../config/passport")(passportP);

module.exports = function(app, passport) {


    app.get("/auth/google", passport.authenticate("google", {scope : ["profile", "email"]}));

    app.get("/auth/google/callback", function(req, res, next) {
        passport.authenticate("google", function(err, director) {
            if (err) {
                res.redirect("/");
            } else if (!director) {
                res.redirect("/");
            } else {
                req.session.director = director;
                res.redirect("/home/tournaments");
            }
        })(req, res, next);
    });

    app.post("/register/local", function(req, res, next) {
        userController.register(req.body, function(err, message) {
            if (err) {
                return res.status(500).send({err : err});
            } else if (message === "EXISTS") {
                return res.send({msg : "A user with that email already exists.", exists : true});
            } else {
                return res.send({msg : "You're good to go! You can login now."});
            }
        });
    });

    app.post("/auth/local", function(req, res, next) {
        userController.validateLocalLogin(req.body, function(err, valid, user) {
            if (err) {
                // res.status(500).send("The validation process isn't working right now");
                res.status(500).render("index", {title : "Neg 5",
                                                message : "Quizbowl for the Cloud",
                                                errormsg : "The validation process isn't working right now."});
            } else if (valid === "NONE") {
                res.status(200).render("index", {title : "Neg 5",
                                                message : "Quizbowl for the Cloud",
                                                errormsg : "There's no one registered under that email."});
            } else if (valid === "INVALID") {
                res.status(200).render("index", {title : "Neg 5",
                                                message : "Quizbowl for the Cloud",
                                                errormsg : "Invalid credentials. Please try again."});
            } else {
                req.session.director = user;
                res.redirect("/home/tournaments");
            }
        });
    });

    app.get("/auth/local", function(req, res, next) {
        res.redirect("/");
    });


    app.get("/home", function(req, res, next) {
        // console.log(req.session);
        if (!req.session.director) {
            res.redirect("/");
        } else {
            // console.log("About to render home page...");
            // res.render("home", {tournamentd : req.session.director});
            res.redirect("/home/tournaments");
        }
    });

    app.route("/logout")
        .get(function(req, res, next) {
            req.session.reset();
            // req.logout();
            res.redirect("/");
        });
};
