const router = require("express").Router();
const orchidsController = require('../controller/orchidsController');

const iniOrchidRoute = (app) => {
    router.get('/name', orchidsController.orchidByName);
    router.get('/:id', orchidsController.orchidById);
    router.get('/', orchidsController.orchidsByPage);
    router.post('/', orchidsController.postOrchid);
    router.put('/', orchidsController.updateOrchid);
    router.delete('/:id', orchidsController.deleteOrchid);

    return app.use('/api/Orchids', router);
}

module.exports = iniOrchidRoute
