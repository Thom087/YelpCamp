var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", 
    {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

// Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/* Campground.create(
    {
        name: "Salmon Creek",
        image:  "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description: "This is an awesome camping side, no water etc."
    },
    {   name: "Mountain Goats Rest", 
        image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
        description: "Blablabla"
    },  
    function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log("Newly created campground: ");
            console.log(campground);    //from database
        }
    }); */


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
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    }); 
});

app.listen(3000, "0.0.0.0", function () {
    console.log('Server is listening on port 3000!!');
});

