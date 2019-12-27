const express = require('express');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const path = require('path');

// bring in db credentials and connection
const db = require('./config/database');

// test DB
db.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error:' + err))


const app = express();

// handlebars middelware
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//bodyparser
app.use(bodyparser.urlencoded({extended: false}));

// set public folder as static
app.use(express.static(path.join(__dirname, '/public')));

// Routes

// Index route
app.get('/', (req,res) => {
    res.render('index', { layout: 'landing' });
})

// Gig routes
app.use('/gigs', require('./routes/gigs'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));