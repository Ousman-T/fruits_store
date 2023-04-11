// require and configure our dotenv package
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 3000;
const fruits = require('./models/fruits');
const Fruit = require('./models/Fruit');
// const Show = require('./views/Show');

// =========Configurations
app.set('view engine', 'jsx');
app.engine('jsx', require('jsx-view-engine').createEngine());

/**
 * Middlewares
 */
app.use((req, res, next) => {
        console.log('I run for all routes');
        next();
})
// parses data coming from the request
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

/**
 * Index: Route (return a list of fruits)
 */
app.get('/fruits/', (req, res) => {
    // res.send(fruits);
    // res.render('fruits/Index', {fruits: fruits});
    Fruit.find({}, (error, allFruits) => {
        res.render('fruits/Index', {fruits: allFruits})
    });
});

/**
 * New Route
 */
app.get('/fruits/new', (req, res) => {
    res.render('fruits/New')
})
/**
 * Post Method (accept data from form)
 */
app.post('/fruits', (req, res) => {
    // checks if checkbox is clicked or not clicked
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    console.log(req.body);
    // fruits.push(req.body);
    Fruit.create(req.body, (error, createdFruit) => {
        // res.send(createdFruit);
        res.redirect('/fruits');
    })
});

/**
 * Show Route: (taking in a parameter to show a specific index of the fruit array)
 */
app.get('/fruits/:id', (req, res) => {
    // res.send(fruits[req.params.indexOfFruitsArray])
    // res.render('fruits/Show', {fruit: fruits[req.params.indexOfFruitsArray]});
    Fruit.findById(req.params.id, (error, foundFruit) => {
        res.render('fruits/Show', {fruit: foundFruit});
    });
});

// if none of the routes matches the request show 404 page/ redirect
app.get('*', (req,res) => {
    res.render('404')
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    // just removing warning message from terminal
    mongoose.set('strictQuery', true)
    // connect to mongoose
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    mongoose.connection.once('open', () => {
        console.log('connected to MongoDB!');
    });  
});