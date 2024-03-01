const passport = require("passport");
const accountsController = require("../controller/accountsController");

const iniAccountRoute = (app) => {
    const router = require("express").Router();

    //get all
    router.get('/', passport.authenticate('isAdmin-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), (req, res) => {
        const authenticatedUser = req.user; // Access the authenticated user from req.user
        accountsController.AccountsPage(req, res, authenticatedUser);
    });

    return app.use('/accounts', router);
}

module.exports = { iniAccountRoute }
