const mongoose = require('mongoose');
const Orchids = require('../models/Orchids');
const Categories = require('../models/Categories');
const Users = require('../models/Users');

class accountService {
    async getAllAccounts() {
        const url = process.env.URL_DB;
        await mongoose.connect(url, { family: 4, dbName: 'shoppingFlowerAss3' });
        let arrUsers = [];

        try {
            arrUsers = await Users.find({}).select('username')
            return { arrUsers };
        } catch (error) {
            console.log(error);
            return { arrUsers };
        } finally {
            // Close the database connection
            mongoose.connection.close();
        }
    }
}

module.exports = new accountService();
