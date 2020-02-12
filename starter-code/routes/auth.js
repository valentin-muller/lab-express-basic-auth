var express = require("express");
var authRouter = express.Router();
const User = require("./../.vscode/model/User");

const bcrypt = require('bcrypt');
//const zxcvbn = require("zxcvbn");
//const saltRounds = 10;

authRouter.post("/", (req, res, next) => {

  const { username, password } = req.body;

   if (password === "" || username === "") {
     res.render("auth/signup-form", {
       errorMessage: "Username and Password are required"
     });
     return;
   }



   User.findOne({ username })
    .then(user => {
      if (user) {
        console.log("WHAT IS USER", user);

        res.render("auth/signup-form", {
          errorMessage: "Username already exists"
        });
        return;
      }

const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      User.create({ username, password: hashedPassword })
        .then(createUser => res.redirect("/"))
        .catch(err => {
          res.render("auth/signup-form", {
            errorMessage: "Error while creating the new user."
          });
        });
    })
    .catch(err => console.log(err));
});

  authRouter.get("/", (req, res) => {
  res.render("auth/signup-form");
});

module.exports = authRouter;
