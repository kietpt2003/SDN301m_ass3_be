const orchidServices = require('../services/OrchidService');
const CategoryService = require('../services/CategoryService');

class orchidsController {
    async orchidsByPage(req, res) {
        let data = await orchidServices.getOrchidsByPage(req.query.page);
        return res.status(data.status).json(data);
    }

    //get controller
    async OrchidsPage(req, res, authenticatedUser) {
        let { arrOrchids, arrCategories } = await orchidServices.getAllOrchids();
        return res.render('OrchidHomePage.ejs', { arrOrchids, arrCategories, authenticatedUser: authenticatedUser });
    }
    async orchidById(req, res, authenticatedUser) {
        let data = await orchidServices.getOrchidById(req.params.id);
        if (data.status !== 200) {
            res.render('error')
        }
        return res.render('OrchidDetail.ejs', { orchid: data.data, authenticatedUser: authenticatedUser });
        // return res.status(data.status).json(data);
    }
    async orchidByName(req, res, authenticatedUser) {
        let data = await orchidServices.getOrchidByName(req.query.name, req.query.page);
        if (data.status !== 200) {
            res.render('error')
        }

        return res.render('OrchidHomePage.ejs', { arrOrchids: data.data.orchidsArr, authenticatedUser: authenticatedUser });
        // return res.status(data.status).json(data);
    }

    //create controller
    async getOrchidCreatePage(req, res, authenticatedUser) {
        let categoryData = await CategoryService.getAllCategories();

        return res.render('OrchidCreate.ejs', { arrCategories: categoryData, authenticatedUser: authenticatedUser });
    }
    async postOrchid(req, res, authenticatedUser) {
        const data = await orchidServices.createOrchid(req.body);
        let { arrOrchids, arrCategories } = await orchidServices.getAllOrchids();
        if (data.error) {
            return res.status(400).render('OrchidCreate.ejs', { arrCategories, currentOrchid: data.data.currentOrchid, error: data.error, authenticatedUser });
        }
        return res.status(200).render('OrchidHomePage.ejs', { arrOrchids, arrCategories, isSuccess: data.isSuccess, authenticatedUser });
    }

    //update controller
    async getOrchidUpdatePage(req, res, authenticatedUser) {
        let orchidData = await orchidServices.getOrchidById(req.params.id);
        let categoryData = await CategoryService.getAllCategories();

        if (orchidData.status !== 200) {
            res.render('error')
        }
        return res.render('OrchidUpdate.ejs', { orchid: orchidData.data, arrCategories: categoryData, authenticatedUser: authenticatedUser });
        // return res.status(data.status).json(data);
    }
    async updateOrchid(req, res, authenticatedUser) {
        const data = await orchidServices.updateOrc(req.body);
        let { arrOrchids, arrCategories } = await orchidServices.getAllOrchids();
        if (data.error) {
            return res.status(400).render('OrchidUpdate.ejs', { arrCategories, orchid: data.data.currentOrchid, error: data.error, authenticatedUser: authenticatedUser });
        }
        return res.status(200).render('OrchidHomePage.ejs', { arrOrchids, arrCategories, isSuccess: data.isSuccess, authenticatedUser: authenticatedUser });
    }

    //comment controller
    async getCommentPage(req, res, authenticatedUser) {
        let orchidData = await orchidServices.getOrchidById(req.params.id);

        if (orchidData.status !== 200) {
            res.render('error')
        }
        return res.render('OrchidComment.ejs', { orchid: orchidData.data, authenticatedUser: authenticatedUser });
    }
    async postComment(req, res, authenticatedUser) {
        console.log('check i ', req.query.i);
        const data = await orchidServices.createComment(req.body, authenticatedUser);
        let orchid = await orchidServices.getOrchidById(req.params.id);
        console.log('check orchid', orchid.data);
        if (data.error) {
            return res.status(400).render('OrchidComment.ejs', { orchid: orchid.data, currentComment: data.data.currentComment, error: data.error, authenticatedUser: authenticatedUser });
        }
        return res.status(200).render('OrchidDetail.ejs', { orchid: orchid.data, isSuccess: data.isSuccess, authenticatedUser: authenticatedUser });
    }

    //delete controller
    async deleteOrchid(req, res, authenticatedUser) {
        const data = await orchidServices.deleteOrchidById(req.body.id);
        if (data.error) {
            const orchidData = await orchidServices.getOrchidById(req.body.id);
            return res.status(400).render('OrchidDetail.ejs', { orchid: orchidData.data, error: data.error, authenticatedUser: authenticatedUser })
        }
        let { arrOrchids, arrCategories } = await orchidServices.getAllOrchids();
        return res.status(200).render('OrchidHomePage.ejs', { arrOrchids, arrCategories, isSuccess: data.isSuccess, authenticatedUser: authenticatedUser });
    }
}

module.exports = new orchidsController();
