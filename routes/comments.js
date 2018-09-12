var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/users');
var Restaurant=require('../models/restaurant');
var Comment=require('../models/comment');
router.post('/new', function (req, res, next) {
   var decoded = jwt.decode(req.query.token);

    Restaurant.findById(req.body.restId, function (err, rest) {
      if (err) {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
      var comment = new Comment({
          text: req.body.comment.comment,
          author:{
            id: decoded.user._id,
            username: decoded.user.username
          },
          time:new Date()
      });
      comment.save(function(error,result){
      if (error) {
          return res.status(500).json({
        title: 'An error occurred',
        error: error
         });
       }
       rest.comments.push(comment);
       rest.save();
       res.status(200).json({
              message: 'make order succesfully',
               obj: result
          });


     });

    });
   });
   router.get("/get/:id", function(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
      if (err) {
               return res.status(500).json({
                   title: 'An error occurred',
                   error: err
               });
           }
           Comment.find({
             '_id': { $in:restaurant.comments}

           },function(err, comments){
             if (err) {
                      return res.status(500).json({
                          title: 'An error occurred',
                          error: err
                      });
                  }
             res.status(200).json({
                 message: 'Success',
                 obj: comments
             });
           });
    });
   });
   router.delete('/delete/:id', function (req, res, next) {

     Comment.findById(req.params.id, function (err, comment) {
         if (err) {
             return res.status(500).json({
                 title: 'An error occurred',
                 error: err
             });
         }
         if (!comment) {
             return res.status(500).json({
                 title: 'No Order Found!',
                 error: {message: 'comment not found'}
             });
         }
         comment.remove(function (err, result) {
             res.status(200).json({
                 message: 'Cancel Order',
                 obj: result
             });
         });
     });
   });
module.exports = router;
