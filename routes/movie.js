const express = require('express');
const app = express();
const Movie = require('../models/movies');


app.get('/', (req, res)=> {

    Movie.find({})
    .populate('celebrities')
    .then((result) => {
        res.render('movies', {movies: result})
    })
    .catch((err) => {
        res.send('Error');
    });

});

module.exports = app;