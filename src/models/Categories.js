import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: false
    },

}, {
    timestamps: true
});

let Categories = mongoose.model('categories', categorySchema);

module.exports = Categories;
