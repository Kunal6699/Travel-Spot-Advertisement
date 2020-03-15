    var express = require("express");
    var router = express.Router();
    var passport = require("passport");
    var User = require("../models/user");

    // root route
    router.get("/",function(req,res){
    res.render("landing");
    
    });
    
    
    
        // =============
        // AUTH ROUTES
        // =============
    
        //show register form 
    
        router.get("/register",function(req,res){
            res.render("register");
        });
         // handle sign up logic 
         router.post("/register",function(req,res){
             
           var newUser = new User({username: req.body.username});
           User.register(newUser,req.body.password,function(err,user){
            if(err)
            {
                //console.log();
                req.flash("error",err.message);
                
                
                return res.render("register");
            }
             passport.authenticate("local")(req,res,function(){
               req.flash("success","Welcome to Yelpcamp!" + user.username);  
              res.redirect("/campgrounds");
            
              
             });
    
           });
            
         });
    
         //  show Login Form
    
         router.get("/login",function(req,res){
          res.render("login");
    
         });
        // handling login LOgic
    
        //pp.post("/login",middleware,callback)
        router.post("/login",passport.authenticate("local",
        {
            successRedirect: "/campgrounds",
            failureRedirect: "/login"
        }), function(req,res){
            
    
        });
    
        // logout Route 
    
        router.get("/logout",function(req,res){
         req.logout();
         req.flash("success", "Logged You out!!!");
         res.redirect("/campgrounds");    
     
        });
       
        

        module.exports = router;