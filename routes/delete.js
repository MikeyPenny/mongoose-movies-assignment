const express = require('express');
const app = express();
const Movie = require('../models/movies');
const mongoose = require('mongoose');

app.get('/delete', (req, res) => {
    let objectId = mongoose.Types.ObjectId(req.query.id);

    Movie.deleteOne({_id: objectId}, (err) =>{
        if (err) res.status(500).send('Cuac cuac cuaaac, is not working ' + err);
        else res.redirect('/');
    });

});

module.exports = app;
