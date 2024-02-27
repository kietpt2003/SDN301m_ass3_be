const morgan = require("morgan");

const configLog = (app) => {
    app.use(morgan('combined'));
}

module.exports = configLog;
