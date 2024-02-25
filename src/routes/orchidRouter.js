const router = require("express").Router();
import { orchidsController } from '../controller/orchidsController';

const iniOrchidRoute = (app) => {
    router.get('/:id', orchidsController.orchidById);
    router.get('/', orchidsController.orchidsByPage);
    router.post('/', orchidsController.postOrchid);
    router.put('/', orchidsController.updateOrchid);
    router.delete('/:id', orchidsController.deleteOrchid);

    return app.use('/api/Orchids', router);
}

export {
    iniOrchidRoute
};