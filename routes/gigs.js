const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

// bring in sequalize and op module (for like searching)
const Sequelize = require('Sequelize');
const Op = Sequelize.Op;

// get gig list
router.get('/', (req,res) => 
    Gig.findAll()
    .then(gigs => {
        res.render('gigs', {
            gigs
        });
    })
    .catch(err => console.log(err)))

// display add Gig form
router.get('/add', (req, res) => {
    res.render('add');
})

// search for a gig
router.get('/search', (req,res) => {
    const { term } = req.query;
    Gig.findAll({where : {technologies : {[Op.like] : `%${term}%`}}})
    .then(gigs => {
        res.render('gigs', {
            gigs
        });
    })
    .catch(err => console.log(err))
});

// use post form data to submit to database
router.post('/add', (req,res) => {
    
    // get form data from body
    let { title, technologies, budget, description, contact_email } = req.body;
    
    // initialize errors array
    let errors = [];

    //validation fields - simple validation
    if(!title){
        errors.push({ text : "Please add a title" })
    }
    if(!technologies){
        errors.push({ text : "Please add some technologies" })
    }
    if(!description){
        errors.push({ text : "Please add a description" })
    }
    if(!contact_email){
        errors.push({ text : "Please add a contact email" })
    }
    if(budget < 0) {
        errors.push({ text : 'Budget must not be below zero...'})
    }

    //check for errors
    // if there are errors then re-render the form with error messages, and return the user submitted values (like a sticky form)
    if(errors.length > 0) {
        res.render('add', {
            errors,
            title,
            technologies,
            budget,
            description,
            contact_email
        });
    } else {
        // validate and append £ to budget amount
        if(!budget){
            budget = "Unknown Amount"
        } else {
            budget = `£${budget}`
        }

        // make lower case and remove space after comma
        technologies = technologies.toLowerCase().replace(/, /g, ',');

        // Insert into table
        Gig.create({
            title,
            technologies,
            budget,
            description,
            contact_email
        })
        .then(gig => res.redirect('/gigs'))
        .catch(err => console.log(err));
    }
});

module.exports = router;