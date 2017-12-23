var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp", 
    {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get('/', function (req, res) {
    res.render("landing");
    //res.render("home");
});
// INDEX show all campgrounds
app.get('/campgrounds', function (req, res) {
    //Get all campground from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:allCampgrounds}); 
        }
    });
});
// Create add new campground to db
app.post("/campgrounds", function (req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});
// New, display form to make new db entry
app.get('/campgrounds/new', function (req, res) {
    res.render("new.ejs");
});
// Show, shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    }); 
});

app.listen(3000, "0.0.0.0", function () {
    console.log('Server is listening on port 3000!!');
});

