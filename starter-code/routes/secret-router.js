var express = require('express');
var siteRouter = express.Router();

siteRouter.use((req, res, next) => {
    if(req.session.currentUser) {
        next();
    }
    else {
        res.redirect("/login");
    }
});


siteRouter.get("", (req, res) => {
    res.render("")
})

siteRouter.get("/logout", (req, res) => {
    req.session.destroy( (err) => {
        res.redirect('/login')
    })
})