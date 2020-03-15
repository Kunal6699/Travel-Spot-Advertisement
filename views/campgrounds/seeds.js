var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {name: "Rishikesh Safari Camp",
    image: "https://live.staticflickr.com/2855/32947507593_3564a7c528_b.jpg",
    description: "Har har Mahadev!!!"
},

{name: "Amazon Forest Camp",
image: "https://farm9.staticflickr.com/8041/7990963976_6479b86a57_z.jpg",
description: "Deadly And For bravehearts like Kunal !!!"
},

{name: "Modern  Camp",
    image: "https://farm9.staticflickr.com/8717/16372928004_f7bb67602f_c.jpg",
    description: "So Modern Baby!!!"
}

]
function seedDB()
{
    // Remove all Campgrounds..

    Campground.remove({},function(err){

        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");

           // add a few campgrounds 
    data.forEach(function(seed){
        Campground.create(seed,function(err,campground){
           if(err){
               console.log(err);
           }
           else { console.log("Added a new Campground"); 
           // create a comment 
            Comment.create(
                {
                  text: "The place is awesome but no internet!!!",
                  author: "Kunal"   
                },function(err,comment){
                        if(err){console.log(err);}
                        else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created New Comment");
                        }
                   
                });
            }
        });
    

    });

    });

 
     
}

module.exports = seedDB;

