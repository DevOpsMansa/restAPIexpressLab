//Imports ---------------------------------

//Requiring express library for future use 
const express = require(`express`);
const users =require(`./data/users`);
const posts =require(`./data/posts`)
const bodyParser = require(`body-parser`);
//console.log(posts);  always test to see you getting the correct data

// Invoke express and store return value in the app variable
const app = express()

//saved port number as a variable for dynamic purposes
const PORT = 3000

//Middleware ------------------------------------

//parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));




//Routes---------------------------------------
app.get('/', (req, res) => {
    res.send('Work in progress!');
  });
  
  app
    .route('/api/users') //linking the routes
    .get((req, res) => {
      res.json(users);
    })
    .post((req, res) => {
      res.send('This is a post users route');
    });
  
  // @route:   GET api/users/:id
  // @desc:    Get one user by id
  // @access:  Public
  app.get('/api/users/:id', (req, res, next) => {
    const user = users.find((u) => u.id == req.params.id);
    if (user) res.json(user);
    else next();
  });
  
  app
    .route('/api/posts') //linking the routes
    .get((req, res) => {
      res.json(posts);
    })
    .post((req, res) => {
      res.send('This is a post posts route');
    });
  
  // @route:   GET api/posts/:id
  // @desc:    Get one post by id
  // @access:  Public
  app.get('/api/posts/:id', (req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);
    if (post) res.json(post);
    else next();
  });
  
  // Custom 404 (not found) middleware.
  // Since we place this last, it will only process
  // if no other routes have already sent a response!
  // We also don't need next(), since this is the
  // last stop along the request-response cycle.
  app.use((req, res) => {
    res.status(404).json({ error: 'Resource Not Found' });
  });
  

//listener --------------------------------------
//Listen to express on a specified PORT 
//LISTENING SHOULD ALWAYS BE THE LAST THING ON THE FILE
app.listen(PORT), () =>{
    console.log(`Server listening on port: ${PORT}`)
}