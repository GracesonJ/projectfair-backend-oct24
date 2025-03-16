// import mangoose
const mongoose = require('mongoose')

// create schema
const userSchema = new mongoose.Schema({
    username: {
        required : true,
        type : String
    },
    email : {
        required : true,
        type : String,
        unique : true
    },
    password : {
        required : true,
        type : String
    },
    profile : {
        type : String
    },
    github : {
        type : String
    },
    linkedin : {
        type : String
    }
})

// create mmodel
const users = mongoose.model("users", userSchema)

// export model
module.exports = users