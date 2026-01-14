import jwt from 'jsonwebtoken';

export const generateToken = (userId, username,password) => {
    return jwt.sign({ userId, username, password }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// export const verifyToken = (token) => {
//     return jwt.verify(token, process.env.JWT_SECRET);
// };