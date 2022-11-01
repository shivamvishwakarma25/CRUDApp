var mongoose = require('mongoose');

var newSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    city: String,
    state: String
})

module.exports=mongoose.model('crud1',newSchema)