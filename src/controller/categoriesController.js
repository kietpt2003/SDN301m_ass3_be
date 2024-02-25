import { createCategory, deleteCategoryById, getAllCategories, updateCate } from "../services/CategoryService";

export const getCategories = async (req, res) => {
    const arrCategories = await getAllCategories();
    return res.status(200).render('CategoryPage.ejs', { arrCategories });
}

export const postCategory = async (req, res) => {
    const data = await createCategory(req.body);
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

export const updateCategory = async (req, res) => {
    const data = await updateCate(req.body);
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

export const deleteCategory = async (req, res) => {
    console.log('check data: ', req.params.id);
    const data = await deleteCategoryById(req.params.id);
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