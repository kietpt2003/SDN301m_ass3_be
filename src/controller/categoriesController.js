const categoryServices = require("../services/CategoryService");

class categoriesController {
    async getCategories(req, res, authenticatedUser) {
        const arrCategories = await categoryServices.getAllCategories();
        return res.status(200).render('CategoryPage.ejs', { arrCategories, authenticatedUser: authenticatedUser });
    }

    async postCategory(req, res, authenticatedUser) {
        const data = await categoryServices.createCategory(req.body);
        const arrCategories = await categoryServices.getAllCategories();
        if (data.error) {
            return res.status(400).render('CategoryPage.ejs', { arrCategories, category: data.data.currentCategory, error: data.error, authenticatedUser: authenticatedUser });
        }
        return res.status(200).render('CategoryPage.ejs', { arrCategories, isSuccess: data.isSuccess, authenticatedUser: authenticatedUser });
    }

    async updateCategory(req, res, authenticatedUser) {
        const data = await categoryServices.updateCate(req.body);
        const arrCategories = await categoryServices.getAllCategories();
        if (data.error) {
            return res.status(400).render('CategoryPage.ejs', { arrCategories, category: data.data.currentCategory, error: data.error, authenticatedUser: authenticatedUser, errCateId: data.data.currentCategory.id });
        }
        return res.status(200).render('CategoryPage.ejs', { arrCategories, isSuccess: data.isSuccess, authenticatedUser: authenticatedUser });
    }

    async deleteCategory(req, res, authenticatedUser) {
        const data = await categoryServices.deleteCategoryById(req.params.id);
        const arrCategories = await categoryServices.getAllCategories();
        if (data.error) {
            // const categoryData = await categoryServices.getCategoryById(req.body.id);
            return res.status(400).render('CategoryPage.ejs', { arrCategories, error: data.error, authenticatedUser: authenticatedUser, errCateId: req.params.id })
        }
        return res.status(200).render('CategoryPage.ejs', { arrCategories, isSuccess: data.deleteSuccess, authenticatedUser: authenticatedUser });
    }
}

module.exports = new categoriesController();
