import { createOrchid, deleteOrchidById, getAllOrchids, updateOrc } from "../services/OrchidService"

export const OrchidsPage = async (req, res) => {
    let arrOrchids = await getAllOrchids();
    console.log('check: ', arrOrchids);
    return res.render('OrchidHomePage.ejs', { arrOrchids });
}

export const postOrchid = async (req, res) => {
    const data = await createOrchid(req.body);
    if (data.error) {
        // return res.status(400).render('OrchidHomePage.ejs', { arrOrchids: data.arrOrchids, error: data.error });
        return res.status(400).json({
            status: 400,
            message: "Invalid data",
            error: data.error
        });
    }
    // return res.status(200).render('OrchidHomePage.ejs', { arrOrchids: data.arrOrchids, isSuccess: data.isSuccess });
    return res.status(200).json({
        status: 200,
        message: "Create Success",
        data: data.data,
        isSuccess: data.isSuccess,
    });
}

export const updateOrchid = async (req, res) => {
    const data = await updateOrc(req.body);
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

export const deleteOrchid = async (req, res) => {
    const data = await deleteOrchidById(req.params.id);
    if (data.error) {
        return res.status(400).json({
            status: 400,
            message: "Invalid data",
            error: data.error
        });
        // return res.status(200).render('OrchidPage.ejs', { arrCategories: data.arrCategories, error: data.error });
    }
    return res.status(200).json({
        status: 200,
        data: data.data,
        deleteSuccess: data.deleteSuccess
    });
    // return res.render('OrchidPage.ejs', { arrCategories: data.arrCategories, deleteSuccess: data.deleteSuccess });
}