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


// getting-started.js
const mongoose = require('mongoose');
const { title } = require('process');

//create schemas

const pageSchema = new mongoose.Schema({
    slug: String, // abput-us friendly url
    name: String,//about us
    description: String,
    
});

const gallerySchema = new mongoose.Schema({
    name: String,
    description: String,

});

const imageSchema = new mongoose.Schema({
    url: String,
    caption: String,
    gallery: { type: mongoose.Schema.Types.ObjectId, ref: "galleries" },
});

const destinationSchema = new mongoose.Schema({
    page: String,
    name: String,
    description: String,
    image: String
},{
    virtuals: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

destinationSchema.virtual('activities', {
    ref: 'activities',
    localField: '_id',
    foreignField: 'destination',
});

// add virutal field for the gallery to the image schema
gallerySchema.virtual('images', {
    ref: 'images',
    localField: '_id',
    foreignField: 'gallery',
});

//activities schema for things to do in each destination
const activitySchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    cost: Number,
    destination: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "destinations" },
});


const Destination = mongoose.model("destinations", destinationSchema);
const Activity = mongoose.model("activities", activitySchema);
const Page = mongoose.model("pages", pageSchema);   
const Gallery = mongoose.model("galleries", gallerySchema);
const Image = mongoose.model("images", imageSchema);


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/travelsite');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main().catch(err => console.log(err));



//serving static files from the "static" directory
//review middleware in exrpess under week 7 in blackboard or https://expressjs.com/en/guide/using-middleware.html


app.use(express.static(path.join(__dirname, 'static')));

app.use(express.urlencoded({ extended: true }));



// generate routes 
app.get('/', async (req, res) => {
    //homepage route
    // find the home page
    const homePage = await Page.findOne({ slug: "home" }).lean().exec();



    const gallery = await Gallery.findOne({ name: "home" }).populate("images").lean();
    const destinations = await Destination.find().lean();

    res.render("home", { 
        title: homePage.name,
        description: homePage.description,
        galleryImages: gallery.images,
        destinations: destinations,
     });

});

//generate routes to populate destinations page
app.post('/destinations', async (req, res) => {
    const { page, name, description, image } = req.body;
    console.log(req.body);
    const newDestination = new Destination({
        page,
        name,
        description,
        image
    });

    await newDestination.save();
   // res.redirect('/destinations');
   res.send('Destination added successfully');
});


app.get('/destinations', async (req, res) => {
    // code to fetch destinations from the database and render the destinations page
    // .lean() is used to convert the mongoose document into a plain javascript object. This is necessary because handlebars can only work with plain javascript objects.

    const destinations = await Destination.find().lean();
    res.render("destinations", { 
        destinations: destinations,
        title: "Destinations",
         });
});

//get a specific destination by _id 
app.get('/destinations/:id', async (req, res) => {
    const { id } = req.params;
    const destination = await Destination.findById(id).populate("activities").lean();
    //const activities = await Activity.find({ destination: id }).lean();


    res.render("details", { 
        "destination": destination,
        "title": destination.name,
        "activities": destination.activities,
         });
});







//activities routes
app.post('/activities', async (req, res) => {
    const { name, description, image, cost, destination } = req.body;
    console.log(req.body);
    const newActivity = new Activity({
        name,
        description,
        image,
        cost,
        destination
    });

    await newActivity.save();
   // res.redirect('/destinations');
   res.send('Activity added successfully');
});



//create a new page
app.post('/pages', async (req, res) => {
    const { slug, name, description } = req.body;
    console.log(req.body);
    const newPage = new Page({
        slug,
        name,
        description,
    });

    await newPage.save();
   // res.redirect('/destinations');
   res.send('Page added successfully');
});

// create a new gallery
app.post('/galleries', async (req, res) => {
    const { name, description } = req.body;
    console.log(req.body);
    const newGallery = new Gallery({
        name,
        description,
    });

    await newGallery.save();
   // res.redirect('/destinations');
   res.send('Gallery added successfully');
});

// create a new image
app.post('/images', async (req, res) => {
    const { url, caption, gallery } = req.body;
    console.log(req.body);
    const newImage = new Image({
        url,
        caption,
        gallery,
    });

    await newImage.save();
   // res.redirect('/destinations');
   res.send('Image added successfully');
});

//start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});









