# sequalize
Node, express, handlebars and sequalize application for gig finding


Supporting note in OneNote

Create table: 

Id { 

Serial 

} 

Title{ 

Varchar 

200 

} 

technologies{ 

Varchar 

200 

} 

budget{ 

Varchar 

20 

} 

Description{ 

text 

} 

Contact_email{ 

Varchar 

200 

} 

createdAt{ 

date 

} 

updatedAt{ 

date 

} 

 

Creating the App 

 

Go to file: 

 

Npm init 

Install dependencies  

Express 

Express-handlebars (or other template engine) 

Bodyparser 

Sequalize docs will give install directions per database 

"author": "Brad Traversy", 
"MIT" 
"dependencies": { 
"body—parser••: "Al. 18.3" 
"express 
"*4.16.4", 
"express—handtebars 
: "A3.ø. 
"pg": ' 
"pg—hstore" : 
"A2.3.2" 
"sequelize A 
" 4.41.2" 
 

Npm I –D nodemon => add nodemon as a dv dependancy 

 

Create App.js 

 

const 
const 
const 
const 
= r.equire( 'express 1); 
express 
= require( 'express—handlebars' ) ; 
exphbs 
= require( body—parser' ) ; 
bodyparser 
= require( path'); 
path 
// bring in db credentials and connection 
const db = requireß' ./config/database')] 
// test DB 
db. authenticate ( ) 
. => console. tog( 'Database connected. 
. catch(err console. log( 'Error:' + err)) 
const app = express(); 
// Routes 
app. get( ' / % 
(req, res) { 
res. send( 'INDEX' • 
const PORT = process.env.PORT Il 5øøø; 
app. listen(PORT, console. logd Server started on port ${PORTY 
 

We create a database connection in config/database.js 

This is imported in line 7 above 

// create sequalize connection 
const Sequelize = require( 'sequelize'); 
// Option 1: Passing parameters separately 
= new Sequelize( •sequalize' , 
modu exports 
•root % 
host: ' localhost% 
dialect: 'mysql' 
 

To start using data we need to create a model (like you would for mongoose). In models/Gig.js (capital for model name) 

const sequelize require( 'Sequelize'); 
= require( ../config/database' ) ; 
const db 
= db.define( 'gig', 
const Gig 
title: { 
type: Sequelize.STRING 
technologies: { 
type: Sequelize.STRING 
description: { 
type: Sequelize.STRING 
budget: { 
type: sequelize.STRING 
contact_email: { 
type: sequelize.STRING 
module. exports = Gig;l 
 

We need to split our routes out from the app to modularise our routes 

// Gig routes 
app. use( ' /gigs , 
requirel ' . / routes/gigs' ) 
Then create gigs routes in routes/gigs.js 

 

const 
const 
const 
const 
require( 'express ' ) ; 
express 
router express.Router(); 
db require( . ./config/database' 
Gig require( . ./models/Gig' ) ; 
router. get( '/' , 
(req, res) 
Gig. findAll 
. thenjgigs { 
console. log (gigs) • 
res. sendStatus (2øø) • 
.catch(err console. log(err))) 
module. exports router; 
 

All CRUD routes for gigs will go in here ^ 

 

To add a gig (using a get request for now) 

 

// add a gig — 
USING GET ROUTE FOR TEST PURPOSES! 
( req. res) { 
router. get( ' /add' , 
const data = { 
title : 'Simple Wordpress Developer' , 
technologies: 'PHP, Wordpress' , 
budget: 
description: 
Phasetlus lacinia pulvinar sapien vitae cursus. 
Nulla facilisi. Nulla facilisi. Nut tam facilisis odio eget 
sem posuere, in mollis nisi vehicula. Phasellus vehicula mi 
dui, ut pulvinar ante tempus a. Nam tincidunt eteifend urna, 
et semper fetis bibendum eu. Morbi condimentum risus quis 
nisi maximus commodo. Phasellus varius risus id ante faucibus 
imperdiet. Vestibulum gravida ac orci sed sagittis. Fusce 
vitae nisi lorem. Duis ut rutrum tortor. Sed nec sodales orci, 
in dignissim diam. ' , 
contact_email: 
' user2@gmait. com 
let { title, technologies, budget, description, 
data; 
// Insert into table 
Gig. create I { 
title, 
techno logies , 
budget , 
description, 
contact_email 
.then (gig res. redirect( ) ) 
.catch;err console. log(err) ) • 
contact_email } = 
(just added some dummy data so we have something to render!) 

 

Add templating engine to app.js 

// handlebars middelware 
app. engine( 'handlebars% exphbst {defaultLayout: 'main ' } ) ) ; 
' handlebars ' ) 
app. set( 'view engine' , 
(handlebars was set to exphbs in initial setup above) 

 

Creating views using handlebars: 

We need to create  

/views/layouts/landing.handlebars => for home 

/views/layouts/main.handlebars => for all other views 

 

Below: main.handlebars 

html> 
<html 
<meta cha 
<meta 
<meta http—equiv="X—UA—Compatib lei' 
<tink href="https://use.fontawesome. com/ releases/v.f 
<tink 
it I 
<bodp 
<header class=" inner"> 
<h2><a href=" fa—code"></i> 
<a href=" 
<a href— 
<a href=" Gig</a> 
<div 
{{{body}}} 
</bodp 
 

Created public folder for images and css (copied brad's styling) 

v public 
showcase.jpg 
# style.css 
We can set a static folder in app.js to handle these routes 

// set public folder as static 
app. use(express.static path. join(_dirname, 
'/public')D) 
 

We need to render our gigs page 

v layouts 
landing.handlebars 
main.handlebars 
gigs. handlebars 
 

And then return all gigs to our view (gigs.js): 

 

// get gig list 
router.get( i/ % 
(req, res) 
Gig. findA11 
. then gigs { 
res. render( 'gigs% 
gigs 
.catchcerr => console. log(err))) 
 

Render all gigs through handlebars (gigs.handlebars): 

<section 
Gigs</hl> 
loop through each gig (passed in as 
{{#each gigs}} 
<div 
{4 ! destructured title 
! dest ructured description 
{{! dest ructured budget 
<li>Budget: 
•gigs • ) 
{{!—— destructured email added to mailto 
btn-reverse">Apply 
<div 
dest ructured techno logy 
Needed: 
logies sma 
gigs 
{{/each}} 
This uses the data passed into the view as gigs, and uses the destructured values within the loop to set a dynamic view that iterates through all gigs! 

 

 

TRAVERSY 18:45 

 

Adding a post form 

 

We need to add the route to view our addGig form: 

Gigs/add 

 

// display add Gig form 
router.get( ' /add' , 
! req. res) => 
res. render; 'add' • 
We can use this route to link to the add.handlebars view in our views directory: 

 

Here is some markup that displays a simple add gig form: 

<section 
<div 
<h1>Add A Gig</hl> 
<p>Your contact email will be shared with registered users to apply to your gig</p> 
{{#each errors}} 
<div 
{{/each}} 
<form action=" /gigs/add" 
<div class=" 
<label 
<input type="text" 
Wordpress website, React developer" 
/divE 
<div class=" input—group"> 
<label for="technologies">Technologies Needed 
</labe 
<input id="technologies" 
javascript, react, PHP" 
<div class=" input—group"> 
Small 
clas input—box" 
<label for="budget">Budget (Leave blank for unknown)</label> 
<input type="number" name="budget" id="budget" class=" input—box" 
5000, løøøø" 
<div class=" input—group"> 
<label for="description">Gig Description</label> 
<textarea name="description" id="description" class=" input—box" 
details of the gig" 
rows:" ript rea> 
<div class:" 
<label for="budget">Contact 
placeho eg. 
5øø, 
the 
<input name="contact_email" class=" input—box" 
an email" 
<input Gig" btn—reverse"> 
</section> 
 Under the title we loop through any errors and display them in the browser 

 

Inside the form we have fields to input a title, technologies, budget, description and contact_email 

 

These responses will submit to /gigs/add which will invoke the router.post('/add') route defined in gigs.js 

 

Creating the index page: 

Currently the index page (route in app.js) displays 'INDEX' so we need to make this now: 

 

Inside landing.handlebars: 

 

html> 
<html 
<meta cha 
<meta name="viewport" 
<meta http—equiv="X—UA—Compatible" content=" ie=edge"> 
<tink href="https://use. fontawesome.com/releases/v5.3.l/css/all.css" 
crossorigin="anonymous"> 
<tink css"> 
<tit it 
<bodp 
<h2><a href=" fa—code"></i> 
CodeGig</a></h2> 
<a href= 
<a href="/gigs/add">Add Gig</a> 
</header> 
{{{body}}} 
B/ htmlB 
 

We have made a simpleheading with a navigation list that references the gigs, and gigs/add routes. (we could create a partial here to make our code DRY...) 

 

We then inject the 'index' body from index.handlebars (which we we=ill add below) into the template. 

  

views/index.handlebars 

 

<section 
<h1>Find a Coding Gig</hl> 
<form> 
<i fa—search"></i> 
<input rch" PHP, 
Rails, 
etc... 
<input 
</form> 
 

The index route in app.js should be changed as follows: 

 

// Index route 
app.get( '/' , 
t req. res) 
res. render( ' index' , 
layout: ' landing 
 We pass in an object as an argument '{ layout : 'landing' } this sets the layout to something other than the pre-set default of 'main' which was previously set in the handlebars middelware. 

 

Making our form submit to the database 

 

As we are using data from our posted form data we need to be able to parse this. As such we need to add the bodyparser middleware to our route. 

 

App.js 

 

//bodyparser 
app. use(bodyparser. urlencoded {extended: false}) ) ; 
 

We use the bodyparser middelware, and pass in the object which sets extended to false (see documentation). 

 

At the moment we are still submitting hardcoded data into the database via the `gigs/add` route. We need to make it that we are passing data from the submitted form to the database instead... 

 

Get data from the request body: 

// get form data from body 
let { title, technologies, budget, description, contact _ email } = 
req. body ; 
 

Validation - Initialise errors array, and push any fields that are empty to array 

//validation fields 
— simple validation 
if( 
errors. text 
if( ! technologies ) { 
errors. push ( { 
if( !description h { 
errors. push 6 { 
if ( ! contact_email 
errors. push ( { 
if(budget < 0) { 
errors. push 6 { 
text 
text 
text 
text 
: "Please add a title" } ) 
: "Please add some technologies" 
: "Please add a description" } ) 
: "Please add a contact email" } ) 
: 'Budget must not be below zero . ' } ) 
 

Check if the errors list is empty or not.. If it is then we will re-render the add form and send back errors along with original user submitted data, to save them filling out the form again: 

 

//check for errors 
// if there are errors then re—render the form with error messages 
if (errors. length > O) { 
res. render( •add', 
errors , 
title, 
technologies, 
budget , 
description, 
contact email 
 

The add.handlebars has been modified to allow for error handling, and re-filling in form data: 

 

{{#each errors}} 
loops through errors and displays them in values are set to 
original req. body data below 
<div 
{{/each}} 
 

Here is an example of a sticky form value: 

<label for="description">Gig 
<texta rea name="description" id="description" class=" input—box" 
the details of the gig" 
Note, the description field is populated with the description data we passed back along with the errors. 

 

If there are no errors then we are going to add some conditions and formatting to the budget variable and the technologies variable: 

else { 
// validate and append f to budget amount 
if I !budget 
budget = "Unknown Amount" 
} else { 
f${budgetY 
budget = 
   

// make lower case and remove space after comma 
technologies 
= technologies. toLowerCase ) . replace(/, /g, ' 
 

Which we will then use to create a new gig, like we did before: 

// Insert into table 
Gig. create ( { 
title, 
technologies, 
budget , 
description, 
contact_email 
. then(gig res. redirect( '/gigs')) 
.catchlerr => console. log(err)); 
 

Searching for Gigs: 

 

At the moment we have a search box on the home page, which is currently submitting to nowhere... we need to change this! 

 

<section class=" 
<h1>Find a Coding Gig</hl> 
<form action="gigs/search" 
<i fa—search"></i> 
<input type="search" name="term" PHP, 
Rails, 
<input type="submit" 
</form> 
8/section8 
The index now submits 'term' as a query string to a get endpoint called /search 

 

We are going to search based on technologies, and as such we need to import the sequalize module and the Op module, which will allow us to search values that are 'like' our submitted term... 

 

// bring in sequalize and op module (for like searching) 
= require( 'Sequelize' ) ; 
const Sequelize 
const Op = 
 

Now we can create the route: 

 

// search for a gig 
router.get( '/sea rch ' , 
req. resj { 
const { term } = 
req. query; 
Gig. : {technologies . 
. then 'gigs { 
res. render( 'gigs % 
gigs 
n; 
.catch' err => console. log(err)) 
{ [Op. like] 
 

This route finds all gigs where the technologies contains the search term. Particular attention should be paid to the gig.findAll statement... 

 

Gig. findA1tj {where : 
(techno logies 
: { (Op. tike] : 
 

Here we want to find all gigs WHERE technologies contains ${term} - The percentage signs state that the term can be preceded or followed by anything – therefore it will return a value if it is contained within our technologies field... 

 

The findAll will return a promise so .then we return our filtered gigs and pass them to the gigs view 

 

We can apply a catch to the promise for error handling. 
