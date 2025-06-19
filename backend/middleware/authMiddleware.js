const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); // Ensure environment variables are loaded

function authMiddleware(req, res, next) {
    // Get token from header
    const authHeader = req.header('Authorization');

    // Check if not token
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }

    // Tokens are usually in the format "Bearer <token>"
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Token is not valid format (Bearer <token>).' });
    }

    const token = tokenParts[1];

    try {
        // Verify token
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT_SECRET is not defined in .env file for middleware');
            return res.status(500).json({ message: 'Server configuration error.' });
        }

        const decoded = jwt.verify(token, jwtSecret);

        // Add user from payload to request object
        req.user = decoded.user; // The payload was structured as { user: { id, username, role } }
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Token verification error:', err.message);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token is expired.' });
        }
        res.status(401).json({ message: 'Token is not valid.' });
    }
}

function authorizeAdmin(req, res, next) {
   if (req.user && req.user.role === 'admin') {
       next();
   } else {
       res.status(403).json({ message: 'Access denied. Admin role required.' });
   }
}

module.exports = { authMiddleware, authorizeAdmin };
