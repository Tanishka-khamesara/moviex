const mongoose=require("mongoose")
const validator=require("validator")

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: true,
        minLength: [3, "username Must contain atleast 3 Characters"],
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must contain atleast 6 characters"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:validator.isEmail
    },
})

const User = mongoose.model("User", userSchema);

module.exports = User;