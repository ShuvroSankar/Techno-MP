const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Check if the authorization header exists
        if (!req.headers.authorization) {
            throw new Error('Authorization header is missing');
        }

        // Split the header to extract the token
        const token = req.headers.authorization.split(' ')[1];

        // Verify and decode the token
        const decryptedToken = jwt.verify(token, process.env.jwt_secret);

        // Set the userId in the request body
        req.body.userId = decryptedToken.userId;

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};
