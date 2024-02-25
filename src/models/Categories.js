import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: {
        type: String,
    },
}, { timestamps: true, });

let Categories = mongoose.model('Categories', categorySchema);

module.exports = Categories;
