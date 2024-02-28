const passport = require('passport');
const orchidServices = require('../services/OrchidService')

class orchidsController {
    async OrchidsPage(req, res) {
        let arrOrchids = await orchidServices.getAllOrchids();
        return res.render('OrchidHomePage.ejs', { arrOrchids });
    }
    async orchidsByPage(req, res) {

        let data = await orchidServices.getOrchidsByPage(req.query.page);
        return res.status(data.status).json(data);
    }
    async orchidById(req, res) {
        let data = await orchidServices.getOrchidById(req.params.id);
        if (data.status !== 200) {
            res.render('error')
        }
        return res.render('OrchidDetail.ejs', { orchid: data.data });
        // return res.status(data.status).json(data);
    }
    async orchidByName(req, res) {
        let data = await orchidServices.getOrchidByName(req.query.name, req.query.page);
        if (data.status !== 200) {
            res.render('error')
        }

        return res.render('OrchidHomePage.ejs', { arrOrchids: data.data.orchidsArr });
        // return res.status(data.status).json(data);
    }
    async postOrchid(req, res) {
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
    }
    async updateOrchid(req, res) {
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
    }
    async deleteOrchid(req, res) {
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

module.exports = new orchidsController();
