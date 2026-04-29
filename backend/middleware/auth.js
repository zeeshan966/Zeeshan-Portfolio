// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Header se token nikaalna
    const token = req.header('Authorization')?.split(' ')[1]; 
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Token se user details (id, role) request mein daal di
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};

const adminMiddleware = (req, res, next) => {
    // Check karna ki role 'admin' hai ya nahi
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: "Access denied. Admins only." });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware };