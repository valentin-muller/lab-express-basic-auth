var express = require('express');
var loginRouter = express.Router();

const User = require('./../.vscode/model/User');
const bcrypt = require('bcrypt');

const saltRounds = 10;

loginRouter.get('/', (req, res, next) => {
    res.render('auth/login-form');
});

loginRouter.post("/", (req, res) => {
    const {username, password} = req.body;

    if (password === "" || username === "") {
        res.render("/auth/login-form", {
            errorMessage: "Username and Password are required"
        });
        return;
    }

User.findOne({username}) 
    .then((user) => {
        if (!user) {
            res.render("auth/login-form", {
                errorMessage: "The username doesn't exist."
            });
            return;
        }


    const passwordFromDB = user.password;

    const passwordCorrect = bcrypt.compareSync(password, passwordFromDB);

    if (passwordCorrect) {
        req.session.currentUser = user;
        res.redirect("/");
    } else {
        res.render("auth/login-form", {
            errorMessage: "Incorrect Password!"
        });
    }
})
.catch(err => console.log(err));
});

module.exports = loginRouter;



