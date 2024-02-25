import mongoose from 'mongoose';
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
    comments: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Comments', // Reference to the Comments schema
        }],
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Categories",
        require: true
    },
}, { timestamps: true, });


let Orchids = mongoose.model('Orchids', orchidSchema);

module.exports = Orchids;
