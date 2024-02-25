import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orchidSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    original: {
        type: String,
        require: true,
    },
    isNatural: {
        type: Boolean,
        require: true,
    },
    color: {
        type: String,
        require: true,
    }

}, {
    timestamps: true
});

let Orchids = mongoose.model('orchids', orchidSchema);

module.exports = Orchids;
