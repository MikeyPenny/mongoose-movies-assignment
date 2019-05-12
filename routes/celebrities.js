const express = new require('express');
const app = express();
const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movies');


app.get('/celebrity', (req, res) => {
    Movie.find({}, (err, result) => {
        res.render('addCelebrity', {movies: result});
    });
});

app.post('/celebrity', (req, res) => {

    Celebrity.find({name: req.body.name})
        .then(celebrity => {
            if (celebrity.length > 0) {
                res.send('Celebrity already exists');
            } else {
                if(Array.isArray(req.body.movies)) {
                    var moviesIds = req.body.movies.map((id) => {
                        return mongoose.Types.ObjectId(id);
                    });
                } else {
                    var moviesIds = [mongoose.Types.ObjectId(req.body.movies)]
                }

                let newCelebrity = {
                    name: req.body.name,
                    occupation: req.body.occupation,
                    catchPhrase: req.body.catchPhrase,
                    movies: moviesIds
                };

                Celebrity.create(newCelebrity, (err) => {
                    res.redirect('/');
                });
                
            }
        })
        .catch(err => {
            res.status(500).send('Error occured');
        });
});

app.get('/celebrity/list', (req, res) => {
    
    Celebrity.find({})
    .populate('movies')
    .then((result) => {  
      res.render('celebrityList', {celebrities: result})  
    })
    .catch((err) => {
        res.send('Error');
    });

});

app.get('/celebrity/:id', (req, res) => {

    
    Celebrity.findById(req.params.id)
    .populate('movies')
    .then( result => {
        
        let moviesId = result.movies.map((movie) => {
            return movie._id;
        })
        let celebrity = result;
        Movie.find({_id: {$nin: moviesId} })
        .then(movies => {
            res.render('celebDetails', {
                celebrity: celebrity,
                featuredMovies: celebrity.movies,
                movies: movies
            })
        });
    })
    .catch(err => {
        res.send(err);
    });
});

app.post('/update-celebrity', (req, res) => {
   
    let updateVals = {name, occupation, catchPhrase, movies} = req.body; 
    let objectId = mongoose.Types.ObjectId(req.body.id);

    Celebrity.update({_id: objectId}, updateVals, (err) => {
        if (err) res.status(500).send('Something went wrong');
        else res.redirect('/celebrity/list');
    });

});

app.get('/delete-celebrity', (req, res) => {
    let objectId = mongoose.Types.ObjectId(req.query.id);

    Celebrity.deleteOne({_id: objectId}, (err) =>{
        if (err) res.status(500).send('Cuac cuac cuaaac, is not working ' + err);
        else res.redirect('/');
    });

});



module.exports = app;