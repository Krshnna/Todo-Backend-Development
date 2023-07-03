const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter a name."]
    },
    email: {
        type: String,
        required: [true, "Please enter a email"],
        unique: [true, "Email already exists! Please use another mail."],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "todo",
        },
    ],
});

userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateToken = async function() {
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET);
}

module.exports = mongoose.model("User", userSchema);