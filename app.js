const express = require('express');
const app = express();
const mongoose = require('mongoose');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = 3000;

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: 'Bruce-And-Nico',
    cookie: { maxAge: 60000 },
    store : new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60 // 1 day
    })
}));

app.use(cookieParser('no le digas a mama'))

app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public/'));

mongoose.connect('mongodb://localhost/imdb', {useNewUrlParser: true}, (err) => {
    if(!err) console.log('connected');
    else console.log('Error', err);
});


app.use('/', atachUserInfo, require('./routes/movie'));
app.use('/', atachUserInfo, require('./routes/details'));
app.use('/', atachUserInfo, require('./routes/update'));
app.use('/', atachUserInfo, require('./routes/delete'));
app.use('/', atachUserInfo, require('./routes/newMovie'));
app.use('/', atachUserInfo, require('./routes/addMovie'));

app.use('/', atachUserInfo, require('./routes/userRoutes'));
app.use('/', atachUserInfo, authenticateSession, require('./routes/celebrities'));

function authenticateSession(req, res, next) {
    if (req.session.currentUser) next();
    else res.send('Bugger off');
}

function atachUserInfo(req, res, next) {
    res.locals.currentUser = req.session.currentUser;
    next();
}



app.listen(port, () => {
    console.log(`Listening at port: ${port}`); 
});