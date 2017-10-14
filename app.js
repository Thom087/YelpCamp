var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

var campgrounds_list = [
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
    {name: "Paradise Campground", image: "http://visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg"},
    {name: "Mountain Goats Rest", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"}
];

app.get('/', function (req, res) {
    res.render("landing");
    //res.render("home");
});

app.get('/campgrounds', function (req, res) {
    res.render("campgrounds", {campgrounds:campgrounds_list});
});

app.post("/campgrounds", function (req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds_list.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get('/campgrounds/new', function (req, res) {
    res.render("new.ejs");
});

app.listen(3000, function () {
    console.log('Server is listening on port 3000!');
});

