const express = require('express');
const app = express();
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    let newUser = {username, email, password} = req.body;

    newUser = new User({
        username,
        email,
        password
    });

    User.find({username})
    .then(user => {
        if (user.length > 0) {
            res.send('User already exists');
        } else {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if(err) throw new Error('hashing error!');
                else {
                    newUser.password = hash;
                    User.create(newUser)
                    .then((user) => {
                        res.send('ok')
                    }); 
                }
            });
        }
    })
    .catch((err) => {
        res.status(500).send('An error has occured!');
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req,res) => {
    User.find({email: req.body.email})
    .then((user) => {
        if(user.length > 0) {
            bcrypt.compare(req.body.password, user[0].password, function(err, equal) {
                debugger
                if(equal) {
                    delete user[0].password;
                    req.session.currentUser = user[0];
                    res.redirect('/');
                } else {
                    res.send('Invalid credentials');
                }
            });
        } else {
            res.send('Invalid credentials');
        }
    })
    .catch((err) => {
        res.status(500).send('An error has occured');
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) res.redirect('/');
        else res.redirect('/login');
    });
});

module.exports = app;