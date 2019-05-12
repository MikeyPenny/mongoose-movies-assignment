const express = require('express');
const app = express();
const Movie = require('../models/movies');
const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');

app.get('/movie/:id', (req, res)=> {
    
    
    Movie.findById(req.params.id)
    .populate('celebrities')
    .then( result => {
        
        let celebId = result.celebrities.map((celebrity) => {
            return celebrity._id;
        })
        let movie = result;
        Celebrity.find({_id: {$nin: celebId} })
        .then(celebrities => {
            res.render('details', {
                movie: movie,
                celebritiesStarring: movie.celebrities,
                celebrities: celebrities
            })
        });
    })
    .catch(err => {
        res.send(err);
    });
    
});

module.exports = app;
