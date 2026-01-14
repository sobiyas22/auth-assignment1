import bcrypt from 'bcrypt';
import User from './user.model.js';
import { generateToken } from './jwt.utils.js';

// ...existing code...

export const createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).send({ message: `User ${username} created successfully.` });
    } catch (error) {
        res.status(500).send({ message: 'Error creating user', error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }
        const token = generateToken(user._id, username, user.password);
        res.send({ message: `User ${username} logged in successfully.`, token });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in', error: error.message });
    }
};