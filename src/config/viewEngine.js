const path = require('path');
// const express = require('express');
import express from "express";

const configViewEngine = (app) => {
    //config template engine
    app.set('views', path.join('./src', 'views'));
    app.set('view engine', 'ejs');

    //config static files
    app.use(express.static(path.join('./src', 'public')));
}

export {
    configViewEngine
}