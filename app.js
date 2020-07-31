const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const geocode = require('./helpers/geocoding');
const weather = require('./helpers/weather');

const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname,'public');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static(publicDir));


//routes
app.get('/', (req, res) => {
    res.render('index', {
        title : 'Home Page',
        creator : 'Jitendra Oza'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Page',
        creator : 'Jitendra Oza',
        message : 'Hello ! I\'m Jitendra Oza.'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help Page',
        creator : 'Jitendra Oza',
        message : 'Please contact help@webiste.com for any queries/questions.'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.location) {
        return res.send({
            error : 'Please enter address'
        });
    }   
    geocode(req.query.location, (error, {latitude, longitude, place} = {}) => {
        if(error) {
            return res.send({
                error
            });
        } 
        weather(latitude, longitude, (err, {description, temperature, feelslike} = {}) => {
            if(err) {
                return res.send({
                    error
                });
            } 
            res.send({
                forecast : description + '. Temperature is ' + temperature + ' degree celsius and it feels like ' + feelslike + ' degree celsius.',
                location : place,
                address : req.query.location
            });
        });
    });
    
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        creator : 'Jitendra Oza',
        message : 'Error! Page not found !',
    });
})

app.listen(port, () => {
    console.log('server is running on ' + port)
})