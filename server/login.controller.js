import bcrypt from 'bcrypt';
import crypto from 'crypto';
import Api from './models/api.model.js';
import User from './models/user.model.js';
import { generateToken } from './jwt.utils.js';


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

        const apikey =  crypto.randomBytes(32).toString('base64url').slice(0, 20);
        await Api.create({ username: username, apikey });

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

export const getMyApiKey = async (req, res) => {
    const username = req.user.username; 

    const doc = await Api.findOne({ username });
    if (!doc) {
        return res.status(404).send({ message: 'API key not found' });
    }

    res.send({ apikey: doc.apikey });
};