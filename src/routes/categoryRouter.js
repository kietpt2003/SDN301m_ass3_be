import express from 'express';
import { deleteCategory, getCategories, postCategory, updateCategory } from '../controller/categoriesController'

const router = express.Router();

const initCategoryRouter = (app) => {
    router.get('/', getCategories); //method get <=> read data
    router.post('/', postCategory);
    router.put('/', updateCategory);
    router.delete('/:id', deleteCategory);

    return app.use('/categories', router);
}

export {
    initCategoryRouter
}