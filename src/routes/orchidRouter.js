const router = require("express").Router();
import { OrchidsPage, deleteOrchid, postOrchid, updateOrchid } from '../controller/orchidsController';

const iniOrchidRoute = (app) => {
    router.get('/', OrchidsPage);
    router.post('/', postOrchid);
    router.put('/', updateOrchid);
    router.delete('/:id', deleteOrchid);

    return app.use('/Orchids', router);
}

export {
    iniOrchidRoute
};