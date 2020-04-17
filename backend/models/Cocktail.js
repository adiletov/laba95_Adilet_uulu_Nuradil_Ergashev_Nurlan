const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const newSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: String,
    recipes: {
        type: String,
        required: true
    },
    publish: {
        type: Boolean,
        default: false
    },
    ingredients: [String],
    ratings: [String]
});

const Cocktail = mongoose.model('Cocktail', newSchema);

module.exports = Cocktail;

