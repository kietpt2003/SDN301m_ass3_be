import { orchidServices } from "../services/OrchidService"

export const orchidsController = {
    orchidsByPage: async (req, res) => {

        let data = await orchidServices.getOrchidsByPage(req.query.page);
        return res.status(data.status).json(data);
    },
    orchidById: async (req, res) => {
        let data = await orchidServices.getOrchidById(req.params.id);
        return res.status(data.status).json(data);
    },
    postOrchid: async (req, res) => {
        const data = await orchidServices.createOrchid(req.body);
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
    },
    updateOrchid: async (req, res) => {
        const data = await orchidServices.updateOrc(req.body);
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
    },
    deleteOrchid: async (req, res) => {
        const data = await orchidServices.deleteOrchidById(req.params.id);
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
}