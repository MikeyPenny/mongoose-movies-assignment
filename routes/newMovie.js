const express = require('express');
const app = express();

app.get('/newMovie', (req, res) => {
    res.render('newMovie');
});

module.exports = app;
