var express = require("express");
const userController = require("../controller/userController");
const { ensureAuthenticated } = require('../config/auth')
var userRouter = express.Router();

userRouter.route("/")
    .get(userController.index)
    .post(userController.register);

userRouter.route("/login")
    .get(userController.login)
    .post(userController.signin)

userRouter.route('/logout')
    .get(userController.signout)

userRouter.route('/dashboard')
    .get(ensureAuthenticated, userController.dashboard)

module.exports = userRouter;
