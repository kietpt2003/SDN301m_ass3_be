const mongoose = require('mongoose');
const { commentSchema } = require('./Comments');
const Schema = mongoose.Schema;

const orchidSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    isNatural: {
        type: Boolean,
        default: false
    },
    origin: {
        type: String,
        require: true
    },
    comments: [commentSchema],
    category: {
        type: Schema.Types.ObjectId,
        ref: "Categories",
        require: true
    },
}, { timestamps: true, });


const Orchids = mongoose.model('Orchids', orchidSchema);
module.exports = Orchids;
