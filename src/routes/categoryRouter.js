const express = require("express");
const categoriesController = require('../controller/categoriesController');

const router = express.Router();

const initCategoryRouter = (app) => {
    router.get('/', categoriesController.getCategories); //method get <=> read data
    router.post('/', categoriesController.postCategory);
    router.put('/', categoriesController.updateCategory);
    router.delete('/:id', categoriesController.deleteCategory);

    return app.use('/categories', router);
}

module.exports = initCategoryRouter;
