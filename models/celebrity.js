const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CelebritySchema = new Schema({
    name: {type: String},
    occupation: {type: String},
    catchPhrase: {type: String},
    movies: [{type: mongoose.Schema.Types.ObjectId, ref: 'movies'}]
});

module.exports = mongoose.model('celebrities', CelebritySchema);