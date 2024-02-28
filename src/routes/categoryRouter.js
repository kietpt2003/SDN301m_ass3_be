const express = require("express");
const categoriesController = require('../controller/categoriesController');
const { ensureAuthenticated } = require("../config/auth");

const router = express.Router();

const initCategoryRouter = (app) => {
    router.get('/', ensureAuthenticated, categoriesController.getCategories); //method get <=> read data
    router.post('/', ensureAuthenticated, categoriesController.postCategory);
    router.put('/', ensureAuthenticated, categoriesController.updateCategory);
    router.delete('/:id', ensureAuthenticated, categoriesController.deleteCategory);

    return app.use('/categories', router);
}

module.exports = initCategoryRouter;
