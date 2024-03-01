const passport = require("passport");
const orchidsController = require('../controller/orchidsController');

const iniOrchidRoute = (app) => {
    const router = require("express").Router();
    //search filter
    router.get('/name', passport.authenticate('isUser-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), (req, res) => {
        const authenticatedUser = req.user; // Access the authenticated user from req.user
        orchidsController.orchidByName(req, res, authenticatedUser);
    });

    //create
    router.get('/create', passport.authenticate('isAdmin-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), (req, res) => {
        const authenticatedUser = req.user; // Access the authenticated user from req.user
        orchidsController.getOrchidCreatePage(req, res, authenticatedUser);
    });
    router.post('/create', passport.authenticate('isAdmin-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), (req, res) => {
        const authenticatedUser = req.user; // Access the authenticated user from req.user
        orchidsController.postOrchid(req, res, authenticatedUser);
    });

    //update
    router.get('/update/:id', passport.authenticate('isAdmin-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), (req, res) => {
        const authenticatedUser = req.user; // Access the authenticated user from req.user
        orchidsController.getOrchidUpdatePage(req, res, authenticatedUser);
    });
    router.put('/update', passport.authenticate('isAdmin-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), (req, res) => {
        const authenticatedUser = req.user; // Access the authenticated user from req.user
        orchidsController.updateOrchid(req, res, authenticatedUser);
    });

    //delete
    router.delete('/delete', passport.authenticate('isAdmin-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), (req, res) => {
        const authenticatedUser = req.user; // Access the authenticated user from req.user
        orchidsController.deleteOrchid(req, res, authenticatedUser);
    });

    //comments
    router.get('/:id/comment', passport.authenticate('isUser-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), (req, res) => {
        const authenticatedUser = req.user; // Access the authenticated user from req.user
        orchidsController.getCommentPage(req, res, authenticatedUser);
    });
    router.post('/:id/comment', passport.authenticate('isUser-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), (req, res) => {
        const authenticatedUser = req.user; // Access the authenticated user from req.user
        orchidsController.postComment(req, res, authenticatedUser);
    });

    //get by id
    router.get('/:id', passport.authenticate('isUser-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), (req, res) => {
        const authenticatedUser = req.user; // Access the authenticated user from req.user
        orchidsController.orchidById(req, res, authenticatedUser);
    });
    //get all
    router.get('/', passport.authenticate('isUser-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), (req, res) => {
        const authenticatedUser = req.user; // Access the authenticated user from req.user
        orchidsController.OrchidsPage(req, res, authenticatedUser);
    });


    return app.use('/Orchids', router);
}

module.exports = { iniOrchidRoute }
