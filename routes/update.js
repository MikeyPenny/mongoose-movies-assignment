const express = require('express');
const app = express();
const Movie = require('../models/movies');
const mongoose = require('mongoose');

app.post('/update', (req, res) => {
    
    let updateVals = {title, director, duration, genre, rate, celebrities } = req.body;
    console.log(updateVals)
    let objectId = mongoose.Types.ObjectId(req.body.id);
    
    Movie.updateOne({_id: objectId}, updateVals, (err) => {
        if (err) res.status(500).send('Annnghhhh, something is wrong!');
        else res.redirect('/');
    });

});

module.exports = app;
