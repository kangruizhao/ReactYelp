var mongoose = require("mongoose");

var mongooseUniqueValidator = require('mongoose-unique-validator');
var UserSchema = new mongoose.Schema({
    username: {type:String,required:true,unique: true},
    password: {type: String, required: true}
});


UserSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model("User", UserSchema);
