
const mongoose = require("mongoose");
const Users = require("../models/Users");

module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error', 'Please log in first!');
        res.redirect('/users/login');
    },

    ensureAdmin: async function (req, res, next) {
        const id = req.params.id;
        if (!id) {
            req.flash('error', 'Need Id!');
            res.redirect('/users/login');
        }
        try {
            const url = process.env.URL_DB;
            await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' }).then(async () => {
                console.log('check id ', id);
                const data = await Users.findById(id)
                console.log('check data: ', data);
            });

            req.flash('error', 'Need Id!');
            res.redirect('/users/login');
            // return next()
        } catch (error) {
            console.log(error);
        } finally {
            // Close the database connection
            mongoose.connection.close();
            // return next()
        }
    }
}
