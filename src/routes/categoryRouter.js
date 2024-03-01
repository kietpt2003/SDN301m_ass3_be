const express = require("express");
const categoriesController = require('../controller/categoriesController');
const { ensureAuthenticated } = require("../config/auth");
const passport = require("passport");

const router = express.Router();

const initCategoryRouter = (app) => {
    router.post('/', passport.authenticate('isAdmin-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), (req, res) => {
        const authenticatedUser = req.user; // Access the authenticated user from req.user
        categoriesController.postCategory(req, res, authenticatedUser);
    });


    router.put('/', passport.authenticate('isAdmin-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), (req, res) => {
        const authenticatedUser = req.user; // Access the authenticated user from req.user
        categoriesController.updateCategory(req, res, authenticatedUser);
    });


    router.delete('/:id', passport.authenticate('isAdmin-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), (req, res) => {
        const authenticatedUser = req.user; // Access the authenticated user from req.user
        categoriesController.deleteCategory(req, res, authenticatedUser);
    });


    router.get('/', passport.authenticate('isAdmin-strategy', { failureRedirect: '/users/dashboard', failureFlash: true }), (req, res) => {
        const authenticatedUser = req.user; // Access the authenticated user from req.user
        categoriesController.getCategories(req, res, authenticatedUser);
    }); //method get <=> read data

    return app.use('/categories', router);
}

module.exports = initCategoryRouter;
