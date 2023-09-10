const router = require("express").Router()
const User = require("../models/useModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middlewares/authMiddleware")
// new user registration
router.post('/register', async (req, res) => {
    try {
        // check if user already axists
        const user = await User.findOne({ email: req.body.email })
        if (user) throw new Error("User already exists")
        //genating hassed password
        const salt = await bcrypt.genSalt(10)
        const hassedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hassedPassword
        // save user
        const newUser = new User(req.body)
        await newUser.save()
        res.send({
            success: true,
            message: 'User is created successfully'
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
})

// user login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        // check if user exists
        if (!user) throw new Error("User is not registered")
        // checking password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) throw new Error("Invalid password")
        // create and assign token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret)
        res.send({
            success: true,
            message: "User logged in successfully",
            data: token
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
})

// Route to get the currently logged-in user
router.get('/get-current-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)
        res.send({
            success: true,
            message: "User fetched successfully",
            data: user
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});

// Export the router
module.exports = router;






