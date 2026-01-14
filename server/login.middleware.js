import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // No header or explicitly "null"/"undefined"
    if (!authHeader || authHeader === 'null' || authHeader === 'undefined') {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7).trim()
        : authHeader.trim();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Unauthorized: Invalid token',
            error: err.message,
        });
    }
};