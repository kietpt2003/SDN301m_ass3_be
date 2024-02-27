const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: {
        type: String,
    },
}, { timestamps: true, });

const Categories = mongoose.model('Categories', categorySchema);
module.exports = Categories
