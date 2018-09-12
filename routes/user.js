var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/users');
router.post('/signup', function (req, res, next) {
    var user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)

    });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'username be used',
                error: err
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(201).json({
            message: 'user created',
            token: token,
            userId: user._id,
            name: user.username,
            obj: result
        });
    });
});
router.post('/signin', function(req, res, next) {
    User.findOne({username: req.body.username}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'username or password invalid',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'username or password invalid',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id,
            name: user.username,
            obj:user
        });
    });
});
module.exports = router;
