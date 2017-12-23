var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

var data = [
    {
    name: "Star night Rest",
    image:  "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg",
    description: "This is an awesome camping side!"
    },
    {
    name: "Lake side Rest",
    image:  "https://farm5.staticflickr.com/4079/4805487492_618e66b63b.jpg",
    description: "This is an awesome camping side!"
    },
    {
    name: "Desert Rest", 
    image: "https://farm8.staticflickr.com/7148/6622139405_9753433ff9.jpg",
    description: "Freaky sandy with no water at all!"
    }
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a campground: ");
                    //create a comment
                    Comment.create(
                        {
                            text: "This is an awesome place but without internet",
                            author: "Thomas Schatt"
                        }, function(err, comment){
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                        });
                }
            });
        });
    });
}
module.exports = seedDB;

