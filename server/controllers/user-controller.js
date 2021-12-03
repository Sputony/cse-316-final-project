const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    auth.verify(req, res, async function () {
        const loggedInUser = await User.findOne({ _id: req.userId });
        return res.status(200).json({
            loggedIn: true,
            user: {
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                email: loggedInUser.email,
                username: loggedInUser.username
            }
        }).send();
    })
}

logoutUser = async (req, res) => {
    auth.verify(req, res, async function () {
        const loggedInUser = await User.findOne({ _id: req.userId });
        return res.status(200).json({
            loggedIn: false,
            user: {
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                email: loggedInUser.email,
                username: loggedInUser.username
            }
        }).send();
    })
}

loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields."});
        }
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res
                .status(400)
                .json({
                    errorMessage: "An account with this email address does not exist."
                })
        }
        const passwordValid = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordValid) {
            return res
                .status(400)
                .json({
                    errorMessage: "The password you entered is incorrect."
                })
        }

        // LOGIN THE USER
        const token = auth.signToken(existingUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                username: existingUser.username,
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, username, password, passwordVerify } = req.body;
        if (!firstName || !lastName || !email || !username || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                });
        }
        let existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                });
        }
        existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this username already exists."
                });
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, email, username, passwordHash
        });
        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                username: savedUser.username
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    getLoggedIn,
    loginUser,
    logoutUser,
    registerUser
}