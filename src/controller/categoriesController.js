const categoryServices = require("../services/CategoryService");

class categoriesController {
    async getCategories(req, res) {
        const arrCategories = await categoryServices.getAllCategories();
        return res.status(200).render('CategoryPage.ejs', { arrCategories });
    }

    async postCategory(req, res) {
        const data = await categoryServices.createCategory(req.body);
        if (data.error) {
            // return res.status(200).render('CategoryPage.ejs', { arrCategories: data.arrCategories, error: data.error });
            return res.status(400).json({
                status: 400,
                message: "Invalid data",
                error: data.error
            });
        }
        // return res.status(200).render('CategoryPage.ejs', { arrCategories: data.arrCategories, isSuccess: data.isSuccess });
        return res.status(200).json({
            status: 200,
            message: "Create Success",
            data: data.data,
            isSuccess: data.isSuccess
        });
    }

    async updateCategory(req, res) {
        const data = await categoryServices.updateCate(req.body);
        if (data.errorUpdate) {
            return res.status(400).json({
                status: 400,
                message: "Invalid data",
                errorUpdate: data.errorUpdate
            });
        }
        return res.status(200).json({
            status: 200,
            data: data.data,
            isUpdate: data.isUpdate
        });
    }

    async deleteCategory(req, res) {
        console.log('check data: ', req.params.id);
        const data = await categoryServices.deleteCategoryById(req.params.id);
        if (data.error) {
            return res.status(400).json({
                status: 400,
                message: "Invalid data",
                error: data.error
            });
            // return res.status(200).render('CategoryPage.ejs', { arrCategories: data.arrCategories, error: data.error });
        }
        return res.status(200).json({
            status: 200,
            data: data.data,
            deleteSuccess: data.deleteSuccess
        });
        // return res.render('CategoryPage.ejs', { arrCategories: data.arrCategories, deleteSuccess: data.deleteSuccess });
    }
}

module.exports = new categoriesController();
