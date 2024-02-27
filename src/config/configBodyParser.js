const express = require("express");

const configBodyParse = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
}

module.exports = configBodyParse;
