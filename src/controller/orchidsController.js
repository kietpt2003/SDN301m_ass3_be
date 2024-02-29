const passport = require('passport');
const orchidServices = require('../services/OrchidService');
const CategoryService = require('../services/CategoryService');

class orchidsController {
    async OrchidsPage(req, res, authenticatedUser) {
        let { arrOrchids, arrCategories } = await orchidServices.getAllOrchids();
        return res.render('OrchidHomePage.ejs', { arrOrchids, arrCategories, authenticatedUser });
    }
    async orchidsByPage(req, res) {
        let data = await orchidServices.getOrchidsByPage(req.query.page);
        return res.status(data.status).json(data);
    }
    async orchidById(req, res, authenticatedUser) {
        let data = await orchidServices.getOrchidById(req.params.id);
        if (data.status !== 200) {
            res.render('error')
        }
        return res.render('OrchidDetail.ejs', { orchid: data.data, authenticatedUser });
        // return res.status(data.status).json(data);
    }
    async APIorchidById(req, res) {
        let data = await orchidServices.getOrchidById(req.params.id);
        return res.status(data.status).json(data);
    }
    async orchidByName(req, res, authenticatedUser) {
        let data = await orchidServices.getOrchidByName(req.query.name, req.query.page);
        if (data.status !== 200) {
            res.render('error')
        }

        return res.render('OrchidHomePage.ejs', { arrOrchids: data.data.orchidsArr, authenticatedUser });
        // return res.status(data.status).json(data);
    }

    async getOrchidCreatePage(req, res, authenticatedUser) {
        let categoryData = await CategoryService.getAllCategories();

        return res.render('OrchidCreate.ejs', { arrCategories: categoryData, authenticatedUser });
    }
    async postOrchid(req, res, authenticatedUser) {
        const data = await orchidServices.createOrchid(req.body);
        let { arrOrchids, arrCategories } = await orchidServices.getAllOrchids();
        if (data.error) {
            return res.status(400).render('OrchidCreate.ejs', { arrCategories, currentOrchid: data.data.currentOrchid, error: data.error, authenticatedUser });
        }
        return res.status(200).render('OrchidHomePage.ejs', { arrOrchids, arrCategories, isSuccess: data.isSuccess, authenticatedUser });
    }

    async getOrchidUpdatePage(req, res, authenticatedUser) {
        let orchidData = await orchidServices.getOrchidById(req.params.id);
        let categoryData = await CategoryService.getAllCategories();

        if (orchidData.status !== 200) {
            res.render('error')
        }
        return res.render('OrchidUpdate.ejs', { orchid: orchidData.data, arrCategories: categoryData, authenticatedUser });
        // return res.status(data.status).json(data);
    }
    async updateOrchid(req, res, authenticatedUser) {
        const data = await orchidServices.updateOrc(req.body);
        let { arrOrchids, arrCategories } = await orchidServices.getAllOrchids();
        if (data.error) {
            return res.status(400).render('OrchidUpdate.ejs', { arrCategories, orchid: data.data.currentOrchid, error: data.error, authenticatedUser });
        }
        return res.status(200).render('OrchidHomePage.ejs', { arrOrchids, arrCategories, isSuccess: data.isSuccess, authenticatedUser });
    }


    async deleteOrchid(req, res, authenticatedUser) {
        const data = await orchidServices.deleteOrchidById(req.body.id);
        if (data.error) {
            const orchidData = await orchidServices.getOrchidById(req.body.id);
            return res.status(400).render('OrchidDetail.ejs', { orchid: orchidData.data, error: data.error, authenticatedUser })
            // return res.status(200).render('OrchidPage.ejs', { arrCategories: data.arrCategories, error: data.error });
        }
        let { arrOrchids, arrCategories } = await orchidServices.getAllOrchids();
        return res.status(200).render('OrchidHomePage.ejs', { arrOrchids, arrCategories, isSuccess: data.isSuccess, authenticatedUser });
        // return res.render('OrchidPage.ejs', { arrCategories: data.arrCategories, deleteSuccess: data.deleteSuccess });
    }
}

module.exports = new orchidsController();
