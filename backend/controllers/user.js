const User = require("../models/user");
// const todo = require("../models/todo");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });

        if (user) {
            return res.status(422).send("Email already exists!");
        }

        user = await User.create({
            name, email, password
        })
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.login = async(req, res) =>  {
    try {
        const {email, password} = req.body;
        let user = await User.findOne({email}).select("+password");
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User doesn't exist"
            });
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }
        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            httpsOnly: true
        }

        res.status(200).cookie("token", token, options).json({
            success: true,
            user, token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}