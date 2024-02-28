const router = require("express").Router();
const passport = require("passport");
const { ensureAuthenticated, ensureAdmin } = require("../config/auth");
const orchidsController = require('../controller/orchidsController');

const iniOrchidRoute = (app) => {
    router.get('/name', ensureAuthenticated, orchidsController.orchidByName);
    router.get('/:id', passport.authenticate('isAdmin-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), orchidsController.orchidById);
    router.get('/', passport.authenticate('isAdmin-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), orchidsController.OrchidsPage);
    router.post('/', ensureAuthenticated, orchidsController.postOrchid);
    router.put('/', ensureAuthenticated, orchidsController.updateOrchid);
    router.delete('/:id', ensureAuthenticated, orchidsController.deleteOrchid);

    return app.use('/Orchids', router);
}

module.exports = iniOrchidRoute
