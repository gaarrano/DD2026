//1. set up a node app with command: npm init
//2. install express with command: npm install express
//3. create a file named server.js and add the following code

const express = require('express');
const app = express();
const port = 3000;

//https://www.npmjs.com/package/express-handlebars is a handlebars view engine for express. It allows you to use handlebars templates in your express app.

const hbs = require('express-handlebars');

app.engine('handlebars', hbs.engine());
app.set('view engine', 'handlebars');


//the path module is used to work with file and directory paths
const path = require('path');


//serving static files from the "static" directory
app.use(express.static(path.join(__dirname, 'static')));



// generate routes 
app.get('/', (req, res) => {
    //sendFile is used to send a file as a response
    let filePath = path.join(__dirname, "static", "homepage.html");
    res.sendFile(filePath);
});

//rendering templates

app.get('/home', (req, res) => {
    res.render('home', {title: "My Website's Homepage"});
});

app.get('/about', (req, res) => {
    //sendFile is used to send a file as a response
    let filePath = path.join(__dirname, "static", "about.html");
    res.sendFile(filePath);
});



app.get('/images/sample.jpg', (req, res) => {
    let filePath = path.join(__dirname, "static", "images", "sample.jpg");
    res.sendFile(filePath);
});




//start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});