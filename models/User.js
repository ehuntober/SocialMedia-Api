const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    profilePicture:{
        type: String,
        required: true,
        min: 6
    },

})