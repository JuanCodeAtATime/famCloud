const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: Object,
        default: {}
    },
    description: {
        type: String
    },
    year: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    continents: {
        type: Number,
        default: 1
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })


photoSchema.index({
    title: 'text',
    description: 'text',
}, {
    weights: {
        name: 5,
        description: 1,
    }
})

const Photo = mongoose.model('Photo', photoSchema);

module.exports = { Photo }