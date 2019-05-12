const express = require('express');
const app = express();
const Movie = require('../models/movies');

app.post('/add-movie', (req, res) => {
    const {title, director, duration, genre, rate } = req.body;
    const newMovie = new Movie ({

        title,
        director,
        duration,
        genre,
        rate
    });

    newMovie.save()
    .then( () => {
        res.redirect("/")
    })
    .catch((err) => {
        res.send(err)
    });


});

module.exports = app;
