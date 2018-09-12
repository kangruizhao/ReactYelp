var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/users');
var Restaurant=require('../models/restaurant')
router.post('/newRestaurant', function (req, res, next) {
   var decoded = jwt.decode(req.query.token);

    User.findById(decoded.user._id, function (err, user) {
      if (err) {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
      var restaurant = new Restaurant({
          name: req.body.name,
          price:req.body.price,
          image: req.body.image,
          description: req.body.description,
          author:{
            id: user._id,
            username: user.username
          }
      });
      restaurant.save(function(error,result){
      if (error) {
          return res.status(500).json({
        title: 'An error occurred',
        error: error
         });
       }
       res.status(200).json({
              message: 'make order succesfully',
               obj: result
          });


     });

    });
   });

   router.get("/all", function(req, res){
    // Get all campgrounds from DB
    Restaurant.find({}, function(err, restaurants){
      if (err) {
               return res.status(500).json({
                   title: 'An error occurred',
                   error: err
               });
           }
           res.status(200).json({
               message: 'Success',
               obj: restaurants
           });
    });
});
router.patch("/edit/:id", function(req, res){
 // Get all campgrounds from DB
 Restaurant.findById(req.params.id, function(err, restaurants){
   if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        restaurants.name=req.body.name;
          restaurants.price=req.body.price;
            restaurants.image=req.body.image;
              restaurants.description=req.body.description;
        restaurants.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
               message: 'add to account succesfully',
              obj: result
           });});
 });
});
router.get("/get/:id", function(req, res){
 // Get all campgrounds from DB
 Restaurant.findById(req.params.id, function(err, restaurants){
   if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: restaurants
        });
 });
});
router.delete('/delete/:id', function (req, res, next) {

  Restaurant.findById(req.params.id, function (err, restaurants) {
      if (err) {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
      if (!restaurants) {
          return res.status(500).json({
              title: 'No Order Found!',
              error: {message: 'Food not found'}
          });
      }
      restaurants.remove(function (err, result) {
          res.status(200).json({
              message: 'Cancel Order',
              obj: result
          });
      });
  });
});
   module.exports = router;
