const cors = require("cors");

const configCORS = (app) => {
    app.use(cors());
}

module.exports = configCORS;
