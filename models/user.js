const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    name: String,
    surname: String,
    email :String,
    password  :String,
    photos :[
        {
        _id: mongoose.Schema.Types.ObjectId,
        imagename: String,
        desc: String,
        date: Date,
        likes: Number
    }]});

module.exports = mongoose.model('Users',userSchema)