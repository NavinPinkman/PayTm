const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://NavinVenkat:navinswaggerchellakutty@cluster0.zr0co.mongodb.net/paytm")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },password: {
        type: String,
        required: true,
        minLength: 6
    },
});

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})

const User = mongoose.model("user",userSchema)
const Account = mongoose.model("Account",accountSchema)

module.exports =  {
    User,Account
}

