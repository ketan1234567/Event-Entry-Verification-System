const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ondirect_super_secret_key_2024_secure_!@#$'; // Must match the one in your controller

const authMiddleware = (req, res, next) => {
    // 1. Get the token from the header
    // Format: "Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Access denied. No token provided.' 
        });
    }

    // 2. Verify the token
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ 
                success: false, 
                message: 'Invalid or expired token' 
            });
        }

        // 3. Attach user data to request object
        req.user = user;
        next(); // Proceed to the next function/controller
    });
};

module.exports = authMiddleware;