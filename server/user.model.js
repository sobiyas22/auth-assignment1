import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});


const User = mongoose.model('Auth', authSchema);

export default User;