const router = require("express").Router();
const passport = require("passport");
const { ensureAuthenticated, ensureAdmin } = require("../config/auth");
const orchidsController = require('../controller/orchidsController');

const iniOrchidRoute = (app) => {
    router.get('/name', ensureAuthenticated, orchidsController.orchidByName);

    router.get('/:id', passport.authenticate('isAdmin-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), (req, res) => {
        const authenticatedUser = req.user; // Access the authenticated user from req.user
        orchidsController.orchidById(req, res, authenticatedUser);
    });

    router.get('/', passport.authenticate('isAdmin-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), (req, res) => {
        const authenticatedUser = req.user; // Access the authenticated user from req.user
        orchidsController.OrchidsPage(req, res, authenticatedUser);
    });

    router.post('/', ensureAuthenticated, orchidsController.postOrchid);

    router.put('/', ensureAuthenticated, orchidsController.updateOrchid);

    router.delete('/:id', ensureAuthenticated, orchidsController.deleteOrchid);

    return app.use('/Orchids', router);
}

module.exports = iniOrchidRoute
